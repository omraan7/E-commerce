// import { decode } from "next-auth/jwt";
// import { cookies } from "next/headers";

// export async function getRealToken( ): Promise<string | null> {
//   const cookie =  await cookies()
// const NextAuthToken = cookie.get("next-auth.session-token")?.value 
//  const RealToken = await decode({secret:process.env.NEXTAUTH_SECRET!,token:NextAuthToken!})
//  if (RealToken) {
//     return RealToken?.accessToken
//  }
//  else{
//     return null
//  }
    
// }

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

interface MyJWT {
  accessToken?: string;
  id?: string;
  name?: string;
}

export async function getRealToken(): Promise<string | null> {
  const cookie =  await cookies()
const NextAuthToken = cookie.get("next-auth.session-token")?.value 

  if (!NextAuthToken) return null;

  const decoded = await decode({ secret: process.env.NEXTAUTH_SECRET!, token: NextAuthToken }) as MyJWT | null;

  return decoded?.accessToken ?? null;
}