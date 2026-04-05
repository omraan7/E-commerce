
import { getreviewProduct, getSingleProduct } from '@/app/home.services'
import ButtonIncreaseAndDecrease from '@/components/ButtonIncreaseAndDecrease/ButtonIncreaseAndDecrease'
import ProductTabs from '@/components/productReviews/ProductReviews'
import RatingStar from '@/components/RatingStar/RatingStar'
import AppButton from '@/components/shard/AppButton/AppButton'
import AppSlider from '@/components/Slider/slider'


export default async function page({ params }: { params: { hamada: string } }) {
  const { hamada } = await params
  // console.log("id from param", hamada)


  const reviews = await getreviewProduct(hamada)
  console.log("reviewsfgf",reviews);
  
  const ProductDetils = await getSingleProduct(hamada)
  console.log("ProductkDetils", ProductDetils);

  const { id, brand, images, price, quantity, category, title, imageCover, priceAfterDiscount, ratingsAverage, ratingsQuantity, description } = ProductDetils
  return (
    <><div className='container mx-auto'>
      <h2>Product Detils</h2>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-3 p-5 border-2 border-main-color">
          <AppSlider imageslist={images} spaceBetween={0} detials={true} navigation={false} />
          {/* <Image width={150 } height={150} src={imageCover} alt={title} />  */}
        </div>
        <div className="col-span-9 p-5 shadow-main-color shadow-lg  ">
          <div className="flex gap-6  ">
            <span className='bg-min-color text-main-color  py-1.5 px-4 rounded-3xl'>{category.name}</span>
            <span className=' flex items-center bg-main-color text-white py-0 px-5 rounded-3xl'>{brand.name}</span>
          </div>
          <h2 className=' font-bold text-3xl my-3.5'>{title}</h2>
          <div className="flex items-center my-3 ">
            <RatingStar ratingsAverage={ratingsAverage} ratingsQuantity={ratingsQuantity} Review={"Review"} />
          </div>
          <div className="my-5">
            {priceAfterDiscount ? <> <span className="text-black text-2xl font-bold mx-3">{priceAfterDiscount} EGP</span> <span className="text-gray-400 line-through ">{price} EGP</span> </> : <span className="text-black font-bold mx-3">{price} EGP</span>}

          </div>
          <div className=" my-7 pb-6 border-b-2 ">
            {quantity > 0 ? <span className="text-green-600 p-2 bg-green-100 rounded-2xl w-fit">In Stock</span> : <span className="text-red-600 p-2 bg-red-100 rounded-2xl">Out of Stock</span>}

          </div>

          <div className="text-gray-700 my-6">
            {description}
          </div>
          {<ButtonIncreaseAndDecrease price={price} />}
          <div className="flex w-full flex-col gap-3">
            <AppButton className='bg-main-color w-full py-6 text-xl ' id={id} quantity={quantity}>Add To Cart</AppButton>
            <button className='bg-second-color text-white w-full py-3 text-xl rounded-xl   '> Buy Now</button>
          </div>

        </div>
      </div>

<div className="my-5">
    <ProductTabs product={ProductDetils} /></div>
    </div>
    </>)
}
