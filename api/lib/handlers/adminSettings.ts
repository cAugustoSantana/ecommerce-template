import type { VercelRequest, VercelResponse } from "@vercel/node";
import { hasDatabase } from "../db.js";
import { requireAdmin } from "../auth.js";
import {
  getStoreConfig,
  getStoreSettingsUpdatedAt,
  saveStoreSettings,
} from "../storeSettings.js";
import { json, methodNotAllowed, readJsonBody } from "../http.js";

export async function handleAdminSettings(req: VercelRequest, res: VercelResponse) {
  if (!hasDatabase()) {
    return json(res, 503, { error: "database_not_configured" });
  }

  try {
    await requireAdmin(req);

    if (req.method === "GET") {
      const [settings, updatedAt] = await Promise.all([
        getStoreConfig(),
        getStoreSettingsUpdatedAt(),
      ]);
      return json(res, 200, { settings, updatedAt });
    }

    if (req.method === "PUT") {
      const body = readJsonBody<{ settings?: unknown }>(req);
      const settings = await saveStoreSettings(body.settings ?? body);
      const updatedAt = await getStoreSettingsUpdatedAt();
      return json(res, 200, { settings, updatedAt });
    }

    return methodNotAllowed(res);
  } catch (err) {
    if (err instanceof Error && err.message === "unauthorized") {
      return json(res, 401, { error: "unauthorized" });
    }
    if (err instanceof Error && err.message.startsWith("invalid_")) {
      return json(res, 400, { error: err.message });
    }
    console.error("admin_settings_error", err);
    return json(res, 500, { error: "server_error" });
  }
}
