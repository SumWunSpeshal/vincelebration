import { v2 as cloudinary } from "cloudinary";

export type CloudinaryResponse = {
  total_count: number;
  time: number;
  rate_limit_allowed: number;
  rate_limit_reset_at: string; // iso string
  rate_limit_remaining: number;
  resources: Array<{
    asset_id: string;
    public_id: string;
    asset_folder: string;
    filename: string;
    display_name: string;
    format: string;
    version: number;
    resource_type: string;
    type: string;
    created_at: string; // iso string
    uploaded_at: string; // iso string
    bytes: number;
    backup_bytes: number;
    width: number;
    height: number;
    aspect_ratio: number;
    pixels: number;
    context: object; // ?
    url: string;
    secure_url: string;
    status: string;
    access_mode: string;
    access_control: null; // ?
    etag: string;
    created_by: null; // ?
    uploaded_by: null; // ?
  }>;
};

cloudinary.config({
  cloud_name: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.PUBLIC_CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };
