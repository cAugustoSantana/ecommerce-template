import type { VercelRequest, VercelResponse } from "@vercel/node";
import { json } from "./http.js";
import { handleCheckout } from "./handlers/checkout.js";
import { handleHealth } from "./handlers/health.js";
import { handleProductsList } from "./handlers/productsList.js";
import { handlePublicSettings } from "./handlers/publicSettings.js";
import { handleAdminAuth } from "./handlers/adminAuth.js";
import { handleAdminStatus } from "./handlers/adminStatus.js";
import { handleAdminOrdersList } from "./handlers/adminOrdersList.js";
import { handleAdminOrderDetail } from "./handlers/adminOrderDetail.js";
import { handleAdminProof } from "./handlers/adminProof.js";
import { handleAdminProductsList } from "./handlers/adminProductsList.js";
import { handleAdminProductDetail } from "./handlers/adminProductDetail.js";
import { handleAdminProductImage } from "./handlers/adminProductImage.js";
import { handleAdminSettings } from "./handlers/adminSettings.js";
import { handleAdminSettingsLogo } from "./handlers/adminSettingsLogo.js";
import { handleOrderPublic } from "./handlers/orderPublic.js";
import { handleOrderProof } from "./handlers/orderProof.js";
import { handleOrderProofMethod } from "./handlers/orderProofMethod.js";

function slugParts(req: VercelRequest): string[] {
  const raw = req.query.slug;
  if (raw != null) {
    return Array.isArray(raw) ? raw.map(String) : [String(raw)];
  }

  const url = req.url ?? "";
  const match = url.match(/^\/api\/?(.*)$/);
  if (!match?.[1]) return [];
  return match[1].split("/").filter(Boolean);
}

function setQueryParam(req: VercelRequest, key: string, value: string) {
  req.query[key] = value;
}

export async function dispatchApi(req: VercelRequest, res: VercelResponse) {
  const slug = slugParts(req);

  if (slug.length === 1 && slug[0] === "health") return handleHealth(req, res);
  if (slug.length === 1 && slug[0] === "checkout") return handleCheckout(req, res);
  if (slug.length === 1 && slug[0] === "settings") return handlePublicSettings(req, res);
  if (slug.length === 1 && slug[0] === "products") return handleProductsList(req, res);

  if (slug[0] === "admin") {
    if (slug.length === 2 && slug[1] === "auth") return handleAdminAuth(req, res);
    if (slug.length === 2 && slug[1] === "status") return handleAdminStatus(req, res);
    if (slug.length === 2 && slug[1] === "orders") return handleAdminOrdersList(req, res);
    if (slug.length === 2 && slug[1] === "settings") return handleAdminSettings(req, res);
    if (slug.length === 3 && slug[1] === "orders") {
      setQueryParam(req, "displayId", slug[2]!);
      return handleAdminOrderDetail(req, res);
    }
    if (slug.length === 3 && slug[1] === "proof") {
      setQueryParam(req, "orderId", slug[2]!);
      return handleAdminProof(req, res);
    }
    if (slug.length === 3 && slug[1] === "settings" && slug[2] === "logo") {
      return handleAdminSettingsLogo(req, res);
    }
    if (slug.length === 2 && slug[1] === "products") return handleAdminProductsList(req, res);
    if (slug.length === 3 && slug[1] === "products") {
      setQueryParam(req, "id", slug[2]!);
      return handleAdminProductDetail(req, res);
    }
    if (slug.length === 4 && slug[1] === "products" && slug[3] === "image") {
      setQueryParam(req, "id", slug[2]!);
      return handleAdminProductImage(req, res);
    }
  }

  if (slug[0] === "orders") {
    if (slug.length === 3 && slug[1] === "public") {
      setQueryParam(req, "displayId", slug[2]!);
      return handleOrderPublic(req, res);
    }
    if (slug.length === 3 && slug[2] === "proof") {
      setQueryParam(req, "displayId", slug[1]!);
      return handleOrderProof(req, res);
    }
    if (slug.length === 3 && slug[2] === "proof-method") {
      setQueryParam(req, "displayId", slug[1]!);
      return handleOrderProofMethod(req, res);
    }
  }

  return json(res, 404, { error: "not_found" });
}
