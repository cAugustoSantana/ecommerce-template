import type { VercelRequest, VercelResponse } from "@vercel/node";
import { dispatchApi } from "../server/router.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  return dispatchApi(req, res);
}
