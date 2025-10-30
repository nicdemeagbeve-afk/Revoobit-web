import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    if (process.env.NODE_ENV === "development") {
      config.module.rules.push({
        test: /\.(jsx|tsx)$/,
        exclude: /node_modules/,
        enforce: "pre",
        use: "@dyad-sh/nextjs-webpack-component-tagger",
      });
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow any hostname for now, or specify your Supabase URL
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ ignore les erreurs TS pendant le build
  },
};

export default nextConfig;