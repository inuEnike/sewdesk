import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ["10.246.184.50"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://sewdesk.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
