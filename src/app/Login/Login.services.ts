//  import { sendLogin } from "./LoginAction";
//  import {  LoginRequest } from "./LoginInterface";

import { getCartData } from "../cart/cartAction";
import { getwishlistData } from "../wishlist/cartAction";

 
// export async function handelLogin(userdata:LoginRequest){
  
//    const res= await sendLogin(userdata)
    
//     return res
// }

// // export default async function handelLogin(userdata :RegisterInterface ) {
   
// // }
export async function handeleGetCartData(  ) {

    
   return await getCartData()

}

export async function handeleGetWishlistData(  ) {

    
   return await getwishlistData()

}
