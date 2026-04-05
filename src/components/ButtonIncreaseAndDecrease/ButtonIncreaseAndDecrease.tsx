"use client";
 import { CartItem } from '@/app/cart/cartInterface';
import { useRouter } from 'next/navigation';
import   { useState } from 'react'

export default function ButtonIncreaseAndDecrease( {price}:{price:number}) {

 

    
      const router = useRouter();
      const [couunt, setCouunt] = useState(1);
    
      async function increase() {
        const newCount = couunt + 1;
    
        setCouunt(newCount);
 
    
      }
    
    
      async function decrease() {
        if (couunt > 1) {
          const newCount = couunt - 1;
    
          setCouunt(newCount);
           router.refresh();
        }
      }
    
    return (
        <>


            <div className="flex items-center gap-3 mt-2">
                <button
                    onClick={decrease}
                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                >
                    -
                </button>

                <span className="font-medium">{couunt}</span>

                <button
                    onClick={increase}
                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                >
                    +
                </button>
            </div>
           <div className="w-full bg-min-color py-5 px-2 rounded-xl flex justify-between my-3"> <span className='text-black text-xl font-medium'>Total Price:</span> {price && <span className="text-main-color font-bold text-xl">{price * couunt} EGP</span>}</div>
             
        </>)
}
