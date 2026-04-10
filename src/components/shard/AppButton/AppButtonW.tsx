"use client"
import { setWishNumber } from '@/app/_Redux/cartNumberslice'
// import { useCartContext } from '@/app/_context/CartContextProvider'
import { deleteItemActionAll } from '@/app/cart/cart.services'
 import { handelAddProductTOWishlist } from '@/app/wishlist/cartAction'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

interface AppButtonProps {
  id: string
  quantity: number
  className?: string
  children?: React.ReactNode
  buttton?: string
}

export default function AppButtonW({buttton, id, quantity, className, children, ...props }: AppButtonProps & React.ComponentProps<typeof Button>) {

// const {updateWishNumber} = useCartContext()
const dispatch = useDispatch();
    
    async function handelAddProductToWishlist() {
        const res = await handelAddProductTOWishlist(id)
        //  console.log( "resposssns",res);
         
        
        if (res) {
            
            // updateWishNumber(res.data.length)
            dispatch(setWishNumber(res.data.length));
            toast.success("Product added to Wishlist successfully" , { position: "top-center" })
        }
        else {
            toast.error(res.message||"Failed to add product to cart or Login first" , { position: "top-center" })
        }
    }

    // async function handelDeleteItemActionAll() {
    //  const res =   await deleteItemActionAll()
   
       
    //     if (res) {
        
    //         toast.success("Cart cleared successfully")
    //         updateCartNumber(res.numOfCartItems)
           
    //     }
    //     else {
    //         toast.error(res.message)
    //     }
        
    // }
// if (buttton === "clear") {
//     return (
//         <Button onClick={handelDeleteItemActionAll} className={`${className}`} {...props}>{children}</Button>
//     )
    
// }
    return (
        <>
            {quantity > 0 ? 
                <Button onClick={   handelAddProductToWishlist} className={`${className}`} {...props}>{children}</Button> 
                : 
                <Button className="w-full" disabled>Out of Stock</Button>
            }
        </>
    )
}