/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/dataviz-color-finder",
  output: "export", // <=== enables static exports
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
