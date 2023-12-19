declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_APP_ROOT_TENANT_ID: string;
    NEXT_APP_BASE_API_URL: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
  }
}
