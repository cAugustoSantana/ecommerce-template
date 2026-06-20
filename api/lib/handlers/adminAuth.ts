import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getClientIp, json, methodNotAllowed, readJsonBody } from "../http.js";
import { rateLimit, rateLimitKey } from "../rateLimit.js";
import { signAdminToken, verifyAdminPassword } from "../auth.js";

type AuthBody = { password: string };

export async function handleAdminAuth(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return methodNotAllowed(res);
  }

  const ip = getClientIp(req);

  try {
    const body = readJsonBody<AuthBody>(req);
    const password = body.password ?? "";

    if (!verifyAdminPassword(password)) {
      const limit = await rateLimit(rateLimitKey("auth-fail", ip), "authFail");
      if (!limit.allowed) {
        return json(res, 429, { error: "rate_limit", retryAfterSec: limit.retryAfterSec });
      }
      return json(res, 401, { error: "unauthorized" });
    }

    const token = await signAdminToken();
    return json(res, 200, { token });
  } catch (err) {
    console.error("admin_auth_error", err);
    return json(res, 500, { error: "auth_failed" });
  }
}
