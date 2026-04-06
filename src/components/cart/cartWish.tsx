"use client";
import { useDispatch} from "react-redux";
import { setWishNumber } from "@/app/_Redux/cartNumberslice";
// import { useCartContext } from "@/app/_context/CartContextProvider";
import { deleteItemAction, updateCartCountAction } from "@/app/cart/cart.services";
import { CartItem } from "@/app/cart/cartInterface";
import { deleteItemActionWishlist } from "@/app/wishlist/cart.services";
import { WishlistItem } from "@/app/wishlist/cartInterface";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


export default function CartWishlist({ pro }: { pro: WishlistItem }) {
  console.log(pro);
  const dispatch = useDispatch();
  
  // const {updateWishNumber} = useCartContext()
  

  const router = useRouter();
  // const [count, setCount] = useState(pro.count);

  // async function increase() {
  //   const newCount = count + 1;

  //   setCount(newCount);
  //   await updateCartCountAction(pro.product._id, newCount);
  //   router.refresh();

  // }


  // async function decrease() {
  //   if (count > 1) {
  //     const newCount = count - 1;

  //     setCount(newCount);
  //     await updateCartCountAction(pro.product._id, newCount);
  //     router.refresh();
  //   }
  // }

  async function removeItem() {
  try {
    const dataOf =await deleteItemActionWishlist(pro._id);
    
    // updateWishNumber(dataOf.data.length);

        dispatch(setWishNumber(dataOf.data.length));

    toast.success("Item removed successfully");
    router.refresh(); 

  } catch (error) {
    toast.error("Failed to remove item");
  }
}
  if (pro === undefined || pro === null) {
    return toast.error("session not found");

  }
  return (
    <div className="bg-white rounded-2xl border border-main-color w-full shadow-2xl mt-1.5 p-4 flex gap-4 items-center hover:shadow-lg transition">


      <Image
        width={100}
        height={100}
        src={pro.imageCover}
        alt={pro.title}
        className="w-24 h-24 object-cover rounded-xl"
      />


      <div className="flex-1">
        <h3 className="font-semibold text-lg">
          {pro.title}
        </h3>

        <p className="text-gray-500 text-sm">
          Price: {pro.price} EGP
        </p>

        {/* <div className="flex items-center gap-3 mt-2">
          <button
            onClick={decrease}
            className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
          >
            -
          </button>

          <span className="font-medium">{count}</span>

          <button
            onClick={increase}
            className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
          >
            +
          </button>
        </div> */}
      </div>

      <div className="flex flex-col items-end gap-3">
        <span className="font-bold text-main-color">
          {pro.price} EGP
        </span>

        <button
          onClick={removeItem}
          className="text-red-200 bg-red-600 hover:bg-white hover:text-red-600  p-2 rounded-md"
        >
          <Trash size={20} />
        </button>
      </div>
    </div>
  );
}