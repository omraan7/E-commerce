"use server"

import { getToken } from "next-auth/jwt"
import { getRealToken } from "../uitil"
import { shippingAddress } from "./checkinterface";

export async function handelCachOrder(shippingAddress:shippingAddress, id: string) {
    const token = await getRealToken()
    const res =await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/orders/${id}`,
        {
            method:"post",
              headers: { token: (token as string),   "Content-Type": "application/json" },
            body:JSON.stringify(shippingAddress)
        }
    );
    const data = await res.json();
    return data
//    console.log( "handelCachOrder ",data);
   

}
export async function handelOnlineOrder(shippingAddress:shippingAddress, id: string) {
    const token = await getRealToken()
    const res =await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
        {
            method:"post",
              headers: { token: (token as string),   "Content-Type": "application/json" },
            body:JSON.stringify(shippingAddress)
        }
    );
    const data = await res.json();
    return data.session.url
   

}