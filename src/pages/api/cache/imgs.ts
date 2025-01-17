import { cache } from "../../../clients/cached-requests";

export async function DELETE() {
  cache.imgs = null;
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
