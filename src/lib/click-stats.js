import "server-only";
import { randomUUID } from "node:crypto";
import { getCloudinary } from "@/lib/cloudinary";

const CLICK_PREFIX = "site-click-events/";
const CLICK_TYPES = new Set(["phone", "whatsapp"]);

export function isClickType(value) {
  return CLICK_TYPES.has(value);
}

export async function recordClick(type, page = "/") {
  if (!isClickType(type)) {
    throw new Error("Gecersiz tiklama turu.");
  }

  const createdAt = new Date().toISOString();
  const day = createdAt.slice(0, 10);
  const safePage = typeof page === "string" && page.startsWith("/")
    ? page.slice(0, 200)
    : "/";
  const event = { type, page: safePage, createdAt };
  const dataUri = `data:application/json;base64,${Buffer.from(
    JSON.stringify(event),
  ).toString("base64")}`;
  const publicId = `${CLICK_PREFIX}${type}/${day}/${Date.now()}-${randomUUID()}.json`;

  await getCloudinary().uploader.upload(dataUri, {
    resource_type: "raw",
    public_id: publicId,
    overwrite: false,
  });

  return event;
}

export async function getClickStats() {
  const stats = {
    phone: 0,
    whatsapp: 0,
    total: 0,
    lastClickAt: null,
  };
  let nextCursor;

  do {
    const result = await getCloudinary().api.resources({
      resource_type: "raw",
      type: "upload",
      prefix: CLICK_PREFIX,
      max_results: 500,
      next_cursor: nextCursor,
    });

    for (const resource of result.resources || []) {
      const publicId = resource.public_id || "";
      if (publicId.startsWith(`${CLICK_PREFIX}phone/`)) stats.phone += 1;
      if (publicId.startsWith(`${CLICK_PREFIX}whatsapp/`)) stats.whatsapp += 1;

      const createdAt = resource.created_at || null;
      if (createdAt && (!stats.lastClickAt || createdAt > stats.lastClickAt)) {
        stats.lastClickAt = createdAt;
      }
    }

    nextCursor = result.next_cursor;
  } while (nextCursor);

  stats.total = stats.phone + stats.whatsapp;
  return stats;
}
