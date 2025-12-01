import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/service-1",
        destination: "/recruit",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
