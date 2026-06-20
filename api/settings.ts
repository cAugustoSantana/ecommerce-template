import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getStoreConfig, toPublicStoreSettings } from "./lib/storeSettings.js";
import { json, methodNotAllowed } from "./lib/http.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return methodNotAllowed(res);
  }

  const config = await getStoreConfig();
  return json(res, 200, { settings: toPublicStoreSettings(config) });
}
