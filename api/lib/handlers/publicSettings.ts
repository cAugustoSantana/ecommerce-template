import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getStoreConfig, toPublicStoreSettings } from "../storeSettings.js";
import { json, methodNotAllowed } from "../http.js";

export async function handlePublicSettings(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return methodNotAllowed(res);
  }

  const config = await getStoreConfig();
  return json(res, 200, { settings: toPublicStoreSettings(config) });
}
