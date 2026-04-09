"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { deleteItemActionAll } from "../cart/cart.services";
import { useDispatch } from "react-redux";
import { setCartNumber } from "../_Redux/cartNumberslice";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
 
export default function Page() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function handleSuccess() {
      toast.success("Payment successful 🎉", {
        position: "top-center",
      });

      await deleteItemActionAll();

      dispatch(setCartNumber(0));


     }


       handleSuccess();
   }, []);
   
  return (
    <>
 <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      
      <div className="bg-gray-50 p-6 rounded-full mb-4 shadow-sm">
        <FaShoppingCart className="text-4xl text-main-color" />
      </div>
{/* 🛒 */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
        Your Cart is Empty 🤦‍♂️<FaShoppingCart />
      </h2>

      <p className="text-gray-500 mb-6">
        Must have some items in your cart to checkout👍
      </p>

      <Link href="/">
        <button className="bg-main-color hover:bg-white hover:text-main-color text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:scale-105 active:scale-95">
          Go Back to Shop
        </button>
      </Link>
    </div>    
    
    
    </>
  )
}
