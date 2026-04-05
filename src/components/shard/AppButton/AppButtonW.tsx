"use client"
import { useCartContext } from '@/app/_context/CartContextProvider'
import { deleteItemActionAll } from '@/app/cart/cart.services'
 import { handelAddProductTOWishlist } from '@/app/wishlist/cartAction'
import { Button } from '@/components/ui/button'
import React from 'react'
import { toast } from 'sonner'

interface AppButtonProps {
  id: string
  quantity: number
  className?: string
  children?: React.ReactNode
  buttton?: string
}

export default function AppButtonW({buttton, id, quantity, className, children, ...props }: AppButtonProps & React.ComponentProps<typeof Button>) {

const {updateWishNumber} = useCartContext()
    
    async function handelAddProductToWishlist() {
        const res = await handelAddProductTOWishlist(id)
        //  console.log( "resposssns",res);
         
        
        if (res) {
            
            updateWishNumber(res.data.length)
            toast.success("Product added to Wishlist successfully")
        }
        else {
            toast.error(res.message)
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