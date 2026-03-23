"use client"
import { createContext, useContext, useState } from "react"
import { CartResponse } from "../cart/cartInterface"
import { WishlistResponse } from "../wishlist/cartInterface"
import GlobalColorSwitcher from "@/components/GlobalColorSwitcher/GlobalColorSwitcher"

export type CartContextType = {
  cartNumber:number,
  updateCartNumber:(num:number)=>void
  updateWishNumber:(num:number)=>void
  wishNumber:number

}
const CartContext = createContext <CartContextType >({cartNumber:0,updateCartNumber:()=>{},updateWishNumber:()=>{},wishNumber:0})

export default function CartContextProvider({children,res,req}:{children:React.ReactNode,res:CartResponse|null,req:WishlistResponse|null}) {

 const [wishNumber, setwishNumber] = useState(()=>{
        return req === null|| req === undefined ? 0 : req.count
    })
    const [cartNumber, setCartNumber] = useState(()=>{
        return res === null|| res === undefined ? 0 : res.numOfCartItems
    })

function updateCartNumber(num:number){
    setCartNumber(num)
}

function updateWishNumber(num:number){
    setwishNumber(num)
}

  return (
<CartContext.Provider value={{cartNumber,updateCartNumber,updateWishNumber,wishNumber}}>
{/* <div className="relative ">
                   <div className= " absolute top-50 left-0">
                     <GlobalColorSwitcher />
                   </div>
  
</div> */}

{children}





</CartContext.Provider>  )
}

export function useCartContext() {
  const res = useContext(CartContext)
  if (res) {
    return res
  }
  throw new Error("useCartContext must be used within a CartContextProvider")
  }