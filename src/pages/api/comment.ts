import type { APIRoute } from "astro";
import { Comment, db } from "astro:db";

export const POST: APIRoute = async ({ request }) => {
  const body: { username: string; comment: string; postId: string } =
    await request.json();

  await db.insert(Comment).values({
    author: body.username,
    content: body.comment,
    postId: body.postId,
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
