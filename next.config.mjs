/** @type {import('next').NextConfig} */
const isGithubPages = process.env.DEPLOY_TARGET === "github-pages";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: isGithubPages ? "export" : "standalone",
  images: {
    unoptimized: isGithubPages,
  },
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
};

export default nextConfig;
