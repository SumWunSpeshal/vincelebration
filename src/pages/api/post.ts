import type { APIRoute } from "astro";
import { Post, db } from "astro:db";

export const POST: APIRoute = async ({ request }) => {
  const body: { username: string; comment: string } = await request.json();

  await db.insert(Post).values({
    author: body.username,
    content: body.comment,
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
