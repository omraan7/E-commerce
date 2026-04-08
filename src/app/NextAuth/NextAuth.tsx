import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { NextAuthOptions } from "next-auth";
import { sendRegister } from "../Register/register.action";
import { sendLogiin } from "../Login/LoginAction";

export const nextConfig: NextAuthOptions = {
    providers: [


        Credentials({
            name: "login ",
            credentials: {
                email: { label: "email", type: "email", placeholder: "inter your email" },
                password: { label: "password", type: "password", placeholder: "inter your password" }
            },
            authorize: async function (credentials) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(credentials),
                });

                const result = await res.json();
                // console.log(result);
                /*
                {
                  message: 'success',
                  user: { name: 'Ashely Atkins', email: 'sihi@mailinator.com', role: 'user' },
                  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjgxNWI5MTcxMzlhZWEyYjA2YTVmZCIsIm5hbWUiOiJBc2hlbHkgQXRraW5zIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzM2NzE4NzksImV4cCI6MTc4MTQ0Nzg3OX0.prp3r71KweF6jZghFTRjnG6yrm0Cxjyn5PuMqLKVlpM'
                }
                */


                const { name, email } = result?.user;

                const res2 = jwtDecode<{ id: string }>(result.token)
                // console.log("hgfdsdfgh",res2)

                if (result.message === "success") {
                    return {
                        name,
                        email,
                        id: res2.id,
                        tokenCredentials: result.token
                    }


                }
                return null


            }


        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,

            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: "email,public_profile",
                },
            },
            userinfo: {
                params: {
                    fields: "id,name,email,picture",
                },
            },
        })
    ],





    callbacks: {




        async jwt({ token, user, account, profile }) {
            console.log("asssss", account);


            if (user) {
                token.accessToken = user.tokenCredentials
                token.id = user.id
            }

            // if (account?.provider === "google" || account?.provider === "facebook") {
            //     const email = user.email || `${account.providerAccountId}@facebook.com`

            //     const userData = {
            //         name: user.name,
            //         email: email,
            //         password: "Pa$$w0rd!",
            //         rePassword: "Pa$$w0rd!",
            //         phone: "01011010111",
            //     }

            //     const userLogin = {
            //         email: user.email,
            //         password: "Pa$$w0rd!",
            //     }

            //     try {
            //         await sendRegister(userData)
            //     } catch {
            //     }

            //     try {
            //         const loginRes = await sendLogiin(userLogin)
            //         console.log("loginRes:", JSON.stringify(loginRes)) // 👈 اتفرج على الشكل الحقيقي

            //         // تأكد إن الـ token موجود وهو string
            //         if (!loginRes?.token || typeof loginRes.token !== "string") {
            //             console.error("No token in loginRes:", loginRes)
            //             return token
            //         }

            //         const decoded = jwtDecode<{ id: string }>(loginRes.token)
            //         token.accessToken = loginRes.token
            //         token.id = decoded.id

            //     } catch (error) {
            //         console.error("Login error:", error)
            //     }
            // }

            if (account && user) {
                const email = user.email || `${account.providerAccountId}@facebook.com`

                const userData = {
                    name: user.name ??"User",
                    email,
                    password: "Pa$$w0rd!",
                    rePassword: "Pa$$w0rd!",
                    phone: "01011010111",
                }

                const userLogin = {
                    email,
                    password: "Pa$$w0rd!",
                }

                try {
                    await sendRegister(userData)
                } catch { }

                try {
                    const loginRes = await sendLogiin(userLogin)

                   if (!loginRes || typeof loginRes !== "string") return token
const decoded = jwtDecode<{ id: string }>(loginRes)
token.accessToken = loginRes
                    token.id = decoded.id
                } catch (err) {
                    console.error(err)
                }
            }
            // console.log("ghjklkjh", account);
            // console.log("user,,,,,", user);
            // console.log("profile,,,,,", profile);


            return token
        },

        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
            }
            return session
        }
    },

    jwt: {
        maxAge: 60 * 60 * 24 * 3
    },
    pages: {
        signIn: "/login",

    },


};


















