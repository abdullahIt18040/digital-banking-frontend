require("dotenv").config();

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "192.168.68.141" },



      { protocol: "http", hostname: "127.0.0.1" },
      { protocol: "http", hostname: "192.168.68.141" },
      { protocol: "http", hostname: "192.168.137.1", port: "9050" },
      { protocol: "http", hostname: "192.168.137.1", port: "9080" },
      { protocol: "http", hostname: "192.168.70.134" },
      { protocol: "http", hostname: "192.168.70.134", port: "3040" },
      { protocol: "http", hostname: "192.168.70.134", port: "3039" },
      { protocol: "http", hostname: "192.168.70.151" },
      { protocol: "http", hostname: "192.168.70.37" },
      { protocol: "http", hostname: "192.168.70.37", port: "3040" },
      { protocol: "http", hostname: "192.168.70.37", port: "3039" },
      { protocol: "http", hostname: "192.168.70.171" },
      { protocol: "http", hostname: "192.168.0.114" },
      { protocol: "http", hostname: "192.168.68.117" },
      { protocol: "https", hostname: "uat.eventby.xyz" },
      { protocol: "https", hostname: "uatbackend.eventby.xyz" },
      { protocol: "https", hostname: "appbackend.eventby.xyz" },
      { protocol: "https", hostname: "chat.eventby.xyz" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "192.168.10.76" },
      { protocol: "http", hostname: "192.168.0.103" },

      // { protocol: 'http', hostname: process.env.NEXT_PUBLIC_BACKEND_SERVER },
      // { protocol: 'http', hostname: process.env.NEXT_PUBLIC_FRONTEND_SERVER },
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;