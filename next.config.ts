import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
  },
  async rewrites() {
    return [
      {
        source: "/orch/:path*",
        destination: "http://localhost:3001/orch/:path*",
      },
    ];
  },
};

export default nextConfig;
