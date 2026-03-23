import AppButton from "@/components/shard/AppButton/AppButton";
import { CartResponse } from "./cartInterface";
import { FaShoppingCart } from "react-icons/fa";

 type Props = {
   data: CartResponse | null;
 };
export default function TopCartPage({data}:Props) {
 
  return (
    <>
    <div className="flex justify-between items-center">
        <div className="   mb-4 flex items-center gap-2   ">
                <FaShoppingCart className="text-4xl bg-main-color text-white p-2 rounded-full" /> <span className="text-2xl font-bold">Shopping Cart</span>
              </div>
        {/* <div className="">total price <span className="font-bold">{data!.data.totalCartPrice}</span></div> */}
        <div className="">
    <AppButton className='bg-main-color'id={data!.cartId!}quantity={1} buttton={"clear"} >Clear All</AppButton>

        </div>
    </div>
    
    
    </>
  )
}
