import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Permite que <Image> optimice las fotos de los personajes
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
        pathname: "/api/character/avatar/**",
      },
    ],
  },
};

export default nextConfig;