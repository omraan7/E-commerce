import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      accessToken: string 
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  interface User {
    id: string
    tokenCredentials: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    accessToken: string
  }
}