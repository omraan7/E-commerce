"use client"
import { useCartContext } from '@/app/_context/CartContextProvider'
import { deleteItemActionAll } from '@/app/cart/cart.services'
import { handelAddProduct } from '@/app/cart/cartAction'
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

export default function AppButton({buttton, id, quantity, className, children, ...props }: AppButtonProps & React.ComponentProps<typeof Button>) {

const {updateCartNumber} = useCartContext()
    
    async function handelAddProductt() {
        const res = await handelAddProduct(id)
         
        
        if (res) {
            
            updateCartNumber(res.numOfCartItems)
            toast.success("Product added to cart successfully")
        }
        else {
            toast.error(res.message)
        }
    }

    async function handelDeleteItemActionAll() {
     const res =   await deleteItemActionAll()
   
       
        if (res) {
        
            toast.success("Cart cleared successffffffffffffffffffffffffffffffffffffully")
            updateCartNumber(res.numOfCartItems)
           
        }
        else {
            toast.error(res.message)
        }
        
    }
if (buttton === "clear") {
    return (
        <Button onClick={handelDeleteItemActionAll} className={`${className}`} {...props}>{children}</Button>
    )
    
}
    return (
        <>
            {quantity > 0 ? 
                <Button onClick={handelAddProductt} className={`${className}`} {...props}>{children}</Button> 
                : 
                <Button className="w-full" disabled>Out of Stock</Button>
            }
        </>
    )
}