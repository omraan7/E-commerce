"use client"
import { setWishNumber } from '@/app/_Redux/cartNumberslice'
import { handelAddProductTOWishlist } from '@/app/wishlist/cartAction'
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

export default function AppButtonW({ buttton, id, quantity, className, children, ...props }: AppButtonProps & React.ComponentProps<typeof Button>) {

  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition()

  function handelAddProductToWishlist() {
    startTransition(async () => {
      const res = await handelAddProductTOWishlist(id)
      if (res) {
        dispatch(setWishNumber(res.data.length));
        toast.success("Product added to Wishlist successfully", { position: "top-center" })
      } else {
        toast.error("Failed to add product to Wishlist or Login first", { position: "top-center" })
      }
    })
  }

  return (
    <>
      {quantity > 0 ? (
        <Button
          onClick={handelAddProductToWishlist}
          disabled={isPending}
          className={`${className} ${isPending ? "cursor-not-allowed opacity-70" : ""}`}
          {...props}
        >
          {isPending ? (
            <><Loader2 size={16} className="animate-spin" /> </>
          ) : children}
        </Button>
      ) : (
        <Button className="w-full" disabled>Out of Stock</Button>
      )}
    </>
  )
}