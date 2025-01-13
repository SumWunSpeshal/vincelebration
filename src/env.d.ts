/// <reference types="astro/client-image" />

interface ImportMetaEnv {
  readonly PUBLIC_VERCEL_ANALYTICS_ID: string;
  readonly USERNAME: string;
  readonly PW: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
