/// <reference types="astro/client-image" />

interface ImportMetaEnv {
  readonly PUBLIC_VERCEL_ANALYTICS_ID: string;
  readonly USERNAME: string;
  readonly PW: string;
  readonly PUBLIC_CLOUDINARY_CLOUD_NAME: string;
  readonly PUBLIC_CLOUDINARY_API_KEY: string;
  readonly CLOUDINARY_API_SECRET: string;
  readonly CLOUDINARY_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
