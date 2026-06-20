import type { VercelRequest, VercelResponse } from "@vercel/node";
import { dispatchApi } from "./lib/router.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  return dispatchApi(req, res);
}
