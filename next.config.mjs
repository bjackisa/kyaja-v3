/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
    experimental: {
      serverComponentsExternalPackages: [
        "@react-email/components",
        "@react-email/render",
        "@react-email/tailwind",
      ],
    },
    eslint: {
 
    ignoreDuringBuilds: true,
  },
  };
  
  export default nextConfig;