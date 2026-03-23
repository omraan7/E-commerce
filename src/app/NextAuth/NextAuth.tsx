import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";


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


                const { name, email } = result.user;

                const res2 = jwtDecode<{ id: string }>(result.token)


                if (res.ok) {
                    return {
                        name,
                        email,
                        id: res2.id,
                        tokenCredentials: result.token
                    }

                }
                return null


            }
        })
    ],

    // callbacks: {

    //     jwt(params) {

    //         if (params.user) {
    //             params.token.tokenon = params.user.tokenCredentials
    //             token.id = params.user.id
    //         }
    //         return params.token

    //     },

    //     session(params) {
    //         console.log("session ", params);


    //     }
    // }




    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.accessToken = user.tokenCredentials
                token.id = user.id
            }
            return token
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id
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