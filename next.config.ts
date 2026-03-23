import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //https://ecommerce.routemisr.com/Route-Academy-products/1680403397402-cover.jpeg
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns:[{
      protocol:"https",
      hostname:"ecommerce.routemisr.com",
      pathname:"/Route-Academy-products/**", 
    },
    {
      protocol:"https",
      hostname:"ecommerce.routemisr.com",
      pathname:"/Route-Academy-categories/**", 
    }
    ]
  }
};

export default nextConfig;
