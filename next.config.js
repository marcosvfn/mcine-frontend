/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_APP_ROOT_TENANT_ID: process.env.NEXT_APP_ROOT_TENANT_ID,
    NEXT_APP_BASE_API_URL: process.env.NEXT_APP_BASE_API_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
