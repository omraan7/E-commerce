 import TopCartPage from './TopCartPage';
import EmptyCart from './ImptyCart';
import Link from 'next/link';
import {  WishlistResponse } from './cartInterface';
import { getwishlistData } from './cartAction';
import CartWishlist from '@/components/cart/cartWish';


export default async function page() {
  const data: WishlistResponse | null = await getwishlistData();

// console.log("data from page wich",data);
if (!data) {
    return <EmptyCart />
  }


  const Wishlist= data!.data??[];


  return (
    <>
      { data!.count >0 ?<div className="container mx-auto mt-5 ">
        <div className=" flex flex-col md:flex-row  gap-5">
          <div className=" md:w-full flex flex-col gap-4">
           <Link href="/"> <span className='text-main-color text-md'>coutinue shopping</span></Link>
        <TopCartPage data={data}/>

            {Wishlist.map((pro) => <CartWishlist pro={pro} key={pro.id} />)}

          </div>


          {/* <div className=" md:w-[30%]">
            <OrderSamary data={data} />
          </div> */}
        </div>

      </div> : <EmptyCart/>}
      
    </>
  //   <>
  //    <div>
  //   {data!.data.map((item) => (
  //     <div key={item._id}>
  //       <img src={item.imageCover} alt={item.title} width={200} />
  //       <h2>{item.title}</h2>
  //       <p>{item.price} EGP</p>
  //       <p>{item.category.name}</p>
  //       <p>{item.brand.name}</p>
  //     </div>
  //   ))}
  // </div>
    
  //   </>

  )
}
