import { Comment, Post, db } from "astro:db"

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Comment).values([
    {
      postId: "studio_cropped_r2yzdc",
      content: "Content",
      author: "Sacha Rodier",
      published: new Date("2024-01-02"),
    },
    {
      postId: "studio_cropped_r2yzdc",
      content: "Content 2",
      author: "Sacha Rodier",
      published: new Date("2024-12-31"),
    },
    {
      postId: "studio_cropped_r2yzdc",
      content: "Content 3",
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
    {
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, quam modi! Consequatur, excepturi magni. Sit, atque. Ad alias, vel voluptates consectetur eos vitae temporibus velit aliquam. Quis officiis cum labore?",
      author: "Somebody else",
    },
    {
      content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, quam modi! Consequatur, excepturi magni. Sit, atque. Ad alias, vel voluptates consectetur eos vitae temporibus velit aliquam. Quis officiis cum labore? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, quam modi! Consequatur, excepturi magni. 
      
      Sit, atque. Ad alias, vel voluptates consectetur eos vitae temporibus velit aliquam. Quis officiis cum labore? Lorem ipsum dolor sit, amet consectetur adipisicing elit. \n\n Perferendis, quam modi! Consequatur, excepturi magni. Sit, atque. Ad alias, vel voluptates consectetur eos vitae temporibus velit aliquam. Quis officiis cum labore?`,
      author: "Somebody else",
    },
  ]);
}
