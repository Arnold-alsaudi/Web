import type { NextConfig } from "next";

// Static export: `npm run build` produces an `out/` folder that can be
// uploaded to any static host (cPanel public_html, Netlify, Vercel...).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
