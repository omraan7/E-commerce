import { nextConfig } from "@/app/NextAuth/NextAuth";
import NextAuth from "next-auth";

 const myRouteHandlerObject=NextAuth(nextConfig);
 export {myRouteHandlerObject as GET ,myRouteHandlerObject as POST}