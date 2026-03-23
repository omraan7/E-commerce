"use server"

 import { RegisterInterface, RegisterResponse } from "./RegisterInterface";
import { cookies } from "next/headers";

export async function sendRegister(userdata :RegisterInterface ): Promise<string> {
try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userdata),
    });

    const result:RegisterResponse = await res.json();
    
   const cookie =await  cookies()
   cookie.set('tkn',result.token ,{
    httpOnly:true,
    sameSite:"strict",
    // maxAge: ( 60 *60 *24)*3 ثلاث ايام
   })
     return result.message

} catch (error) {
     return (error as Error).message
}
    
}