"use client"
import { setCartNumber } from '@/app/_Redux/cartNumberslice'
import { deleteItemActionAll } from '@/app/cart/cart.services'
import { handelAddProduct } from '@/app/cart/cartAction'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import React, { useTransition } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

interface AppButtonProps {
  id: string
  quantity: number
  className?: string
  children?: React.ReactNode
  buttton?: string
}

export default function AppButton({ buttton, id, quantity, className, children, ...props }: AppButtonProps & React.ComponentProps<typeof Button>) {

  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition()

  function handelAddProductt() {
    startTransition(async () => {
      const res = await handelAddProduct(id)
      if (res) {
        dispatch(setCartNumber(res.numOfCartItems));
        toast.success("Product added to cart successfully", { position: "top-center" })
      } else {
        toast.error("Failed to add product to cart or Login first", { position: "top-center" })
      }
    })
  }

  function handelDeleteItemActionAll() {
    startTransition(async () => {
      const res = await deleteItemActionAll()
      if (res) {
        toast.success("Cart cleared successfully", { position: "top-center" })
        dispatch(setCartNumber(res.numOfCartItems));
      } else {
        toast.error("Failed to clear cart", { position: "top-center" })
      }
    })
  }

  if (buttton === "clear") {
    return (
      <Button
        onClick={handelDeleteItemActionAll}
        disabled={isPending}
        className={`${className} ${isPending ? "cursor-not-allowed opacity-70" : ""}`}
        {...props}
      >
        {isPending ? (
          <><Loader2 size={16} className="animate-spin" /> Clearing...</>
        ) : children}
      </Button>
    )
  }

  return (
    <>
      {quantity > 0 ? (
        <Button
          onClick={handelAddProductt}
          disabled={isPending}
          className={`${className} ${isPending ? "cursor-not-allowed opacity-70" : ""}`}
          {...props}
        >
          {isPending ? (
            <><Loader2 size={16} className="animate-spin" />  </>
          ) : children}
        </Button>
      ) : (
        <Button className="w-full" disabled>Out of Stock</Button>
      )}
    </>
  )
}