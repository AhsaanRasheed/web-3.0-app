/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  images: {
    domains: ["ai-news-images.s3-eu-west-3.amazonaws.com"],
  },
  output: "export",
};

module.exports = nextConfig;
