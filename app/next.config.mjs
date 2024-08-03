/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.themealdb.com",
        port: "",
        pathname: "/images/ingredients/**",
      },
      {
        protocol: "https",
        hostname: "mui.com",
        port: "",
        pathname: "/static/**",
      },
      {
        protocol: "https",
        hostname: "nextjs.org",
        port: "",
        pathname: "/static/**",
      },
      {
        protocol: "https",
        hostname: "assets.vercel.com",
        port: "",
        pathname: "/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "openai.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
