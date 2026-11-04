import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.STATIC_EXPORT ? "export" : undefined,
  images: { unoptimized: !!process.env.STATIC_EXPORT },
};

export default nextConfig;
