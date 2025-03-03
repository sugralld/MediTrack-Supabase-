/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "dhpptvdzpnsvvdpeijac.supabase.co",
          pathname: "/storage/v1/object/public/**",
        },
      ],
    },
    experimental: {
      serverActions: true, 
    },
  };
  
  export default nextConfig;
  