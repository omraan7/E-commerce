"use server"

 import { cookies } from "next/headers";
 import {  LoginRequest, } from "./LoginInterface";

export async function sendLogiin(userdata :LoginRequest ): Promise<string> {
try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userdata),
    });

    const result = await res.json();
    
   const cookie =await  cookies()
   cookie.set('tkn',result.token ,{
    httpOnly:true,
    sameSite:"strict",
    // maxAge: ( 60 *60 *24)*3 ثلاث ايام
   })
     return result.token

} catch (error) {
     return (error as Error).message
}
    
}