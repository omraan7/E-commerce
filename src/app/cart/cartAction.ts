
"use server"


import { revalidatePath } from "next/cache";
//https://ecommerce.routemisr.com/api/v2/cart



import { getRealToken } from "../uitil";
import { CartResponse } from "./cartInterface";

export async function getCartData(): Promise<CartResponse | null> {
    const token = await getRealToken()

    if (token) {
        const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/cart`
            , {

                headers: { token: (token as string) },
                cache: "force-cache"

            }

        );

        const data: CartResponse = await req.json();
       
        

        return data

    } else {
        // console.log("session is not valid");
        return null

    }



}

export async function UpdateCartCount(id: string, count: number) {
    const token = await getRealToken()
    const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/cart/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token: token!
            },
            body: JSON.stringify({ count })
        }
    )

    const data = await req.json();
                 revalidatePath("/cart");
    


    return data
}
export async function deleteProductFromCart(id: string) {
    const token = await getRealToken()
    const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/cart/${id}`,
        {
            method: "DELETE",
            headers: { token: token! }
        }
    )

    if (req.ok) {
        const data = await req.json();
            revalidatePath("/cart");


    return data.numOfCartItems 
        
    }
    else{
        return null
    }
}


export async function deleteAllProductFromCart() {
    const token = await getRealToken()
    const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/cart`,
        {
            method: "DELETE",
            headers: { token: token! }
        }
    )

    const data = await req.json();
            revalidatePath("/cart");

    // console.log("data from delete ALL", data);
    
    

    return data
}



export async function handelAddProduct(id: string) {


    const bodyObj = {
        productId: id
    }
    const realToken = await getRealToken()
    if (realToken) {

        try {
            const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/cart`, {

                method: "post",
                headers: {
                    token: realToken,
                    "Content-Type": "application/json"
                }, body: JSON.stringify(bodyObj),

            });
            const data = await req.json();
            revalidatePath("/cart");

            // console.log("handelAddProduct", data);


            return data
        } catch (error) {

            return (error as Error).message
        }
    } else {
        return null
    }


}