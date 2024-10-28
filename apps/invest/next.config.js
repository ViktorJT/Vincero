// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  transpilePackages: ["ui", "eslint-config", "typescript-config"], // do I need to transpile the configs?
  //transpilePackages: ["ui"], // This transpiles local packages (meant for monorepos)
};

export default nextConfig;
