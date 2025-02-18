import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import db from "@astrojs/db";

export default defineConfig({
  output: "server",
  image: {
    domains: ["res.cloudinary.com"],
  },
  adapter: vercel({
    imageService: true,
    webAnalytics: {
      enabled: true,
    },
  }),
  integrations: [tailwind({ applyBaseStyles: false }), react(), db()],
});
