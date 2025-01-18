import { Comment, Post, db } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Comment).values([
    {
      postId: "studio_cropped_r2yzdc",
      content: "Content",
      author: "Sacha Rodier",
    },
    {
      postId: "studio_cropped_r2yzdc",
      content: "Content 2",
      author: "Sacha Rodier",
    },
    {
      postId: "foobar",
      content: "Content 3",
      author: "Max Mustermann",
    },
  ]);

  await db.insert(Post).values([
    {
      content: "Standalone Post",
      author: "Sacha Rodier",
    },
  ]);
}
