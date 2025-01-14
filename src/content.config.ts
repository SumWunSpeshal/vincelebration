import { cldAssetsLoader } from "astro-cloudinary/loaders";
import { defineCollection } from "astro:content";

const cloudinaryImages = defineCollection({
  loader: cldAssetsLoader({
    metadata: true,
    limit: 100,
  }),
});

export const collections = { cloudinaryImages };
