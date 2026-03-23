import Cart from '@/components/cart/cart';
import { CartResponse } from './cartInterface';
import { getCartData } from './cartAction';
import OrderSamary from './OrderSamary';
import TopCartPage from './TopCartPage';
import EmptyCart from './ImptyCart';
import Link from 'next/link';


export default async function page() {
  const data: CartResponse | null = await getCartData();

console.log("datakkkkkkkk",data);

  const products = data!.data.products;


  return (
    <>
      { data!.numOfCartItems >0 ?<div className="container mx-auto mt-5 ">
        <div className=" flex flex-col md:flex-row  gap-5">
          <div className=" md:w-[70%] flex flex-col gap-4">
           <Link href="/"> <span className='text-main-color text-md'>coutinue shopping</span></Link>
        <TopCartPage data={data}/>

            {products.map((pro) =><Cart pro={pro} key={pro._id} />)}

          </div>


          <div className=" md:w-[30%]">
            <OrderSamary data={data} />
          </div>
        </div>

      </div> : <EmptyCart/>}
    </>

  )
}
