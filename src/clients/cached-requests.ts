import { cloudinary, type CloudinaryResponse } from "./cloudinary";

export const cache: {
  imgs: CloudinaryResponse | null;
} = {
  imgs: null,
};

export async function getFromCache<
  T extends (typeof cache)[keyof typeof cache],
>(key: keyof typeof cache, cb: () => Promise<NonNullable<T>>) {
  cache[key] ??= await cb();
  return cache[key];
}

export async function getImages() {
  return await getFromCache("imgs", async () => {
    return await cloudinary.search
      .expression('(resource_type:image OR resource_type:video) AND folder=""')
      .with_field("context")
      .max_results(100)
      .execute();
  });
}
