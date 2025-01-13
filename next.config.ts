import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/orch/:path*", // This will match any requests starting with /orch/
        destination: "http://localhost:3001/orch/:path*", // Proxy the request to your backend
      },
    ];
  },
};

export default nextConfig;
