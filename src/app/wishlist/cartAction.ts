
"use server"


import { revalidatePath } from "next/cache";
//https://ecommerce.routemisr.com/api/v2/cart



import { getRealToken } from "../uitil";
import { WishlistResponse } from "./cartInterface";

export async function getwishlistData(): Promise<WishlistResponse | null> {
    const token = await getRealToken()

    if (token) {
        const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`
            , {

                headers: { token: (token as string) },

                cache: "force-cache"
            }

        );

        const data: WishlistResponse = await req.json();
        // console.log("data from wishlist", data);

        return data

    } else {
        console.log("session is not valid");
        return null

    }



}


export async function deleteProductFromWishlist(id: string) {
    const token = await getRealToken()
    const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${id}`,
        {
            method: "DELETE",
            headers: { token: token! }
        }
    )

    if (req.ok) {
        const data = await req.json();
       
        
        revalidatePath("/wishlist");


        return data

    }
    else {
        return null
    }
}


// export async function deleteAllProductFromCart() {
//     const token = await getRealToken()
//     const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/cart`,
//         {
//             method: "DELETE",
//             headers: { token: token! }
//         }
//     )

//     const data = await req.json();
//     revalidatePath("/cart");

//     console.log("data from delete ALL", data);



//     return data
// }



export async function handelAddProductTOWishlist(id: string) {


    const bodyObj = {
        productId: id
    }
    const realToken = await getRealToken()
    if (realToken) {

        try {
            const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`, {

                method: "post",
                headers: {
                    token: realToken,
                    "Content-Type": "application/json"
                }, body: JSON.stringify(bodyObj),


            });
            const data = await req.json();
            revalidatePath("/wishlist");

            console.log("handelAddProduct to wishlist", data);


            return data
        } catch (error) {

            return (error as Error).message
        }
    } else {
        return null
    }


}