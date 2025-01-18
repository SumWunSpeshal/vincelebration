import { column, defineDb, defineTable, NOW } from "astro:db";

export const Comment = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    author: column.text(),
    content: column.text(),
    postId: column.text(),
    published: column.date({ default: NOW }),
  },
});

export const Post = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    author: column.text(),
    content: column.text(),
    published: column.date({ default: NOW }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    Comment,
    Post,
  },
});
