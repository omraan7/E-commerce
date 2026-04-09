import Cart from '@/components/cart/cart';
import { CartResponse } from './cartInterface';
import { getCartData } from './cartAction';
import OrderSamary from './OrderSamary';
import TopCartPage from './TopCartPage';
import EmptyCart from './ImptyCart';
import Link from 'next/link';


export default async function page() {
  const data: CartResponse | null = await getCartData();

  // console.log("datakkkkkkkk",data);
  if (!data) {
    return <EmptyCart />
  }


  const products = data!.data?.products??[];


  return (
    <>
      {data!.numOfCartItems > 0 ? <div className="container mx-auto mt-5 ">
        <div className="max-w-6xl mx-auto   pt-4 pb-2">
        <nav className="text-sm text-gray-500 flex items-center gap-1">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-gray-700">Cart</Link>
         
        </nav>
      </div>
        <div className=" flex flex-col md:flex-row  gap-5">
          <div className=" md:w-[70%] flex flex-col gap-4">
            <Link href="/"> <span className='text-main-color text-md'>coutinue shopping</span></Link>
            <TopCartPage data={data} />

            {products.map((pro) => <Cart pro={pro} key={pro._id} />)}

          </div>


          <div className=" md:w-[30%]">
            <OrderSamary data={data} />
          </div>
        </div>

      </div> : <EmptyCart />}
    </>

  )
}
