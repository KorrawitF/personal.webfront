import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Standalone output traces only the files `server.js` needs at runtime,
  // so the production image can skip node_modules and the rest of the repo.
  output: "standalone",
};

export default nextConfig;
