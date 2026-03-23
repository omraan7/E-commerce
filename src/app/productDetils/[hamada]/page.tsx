import { getSingleProduct } from '@/app/home.services'
import RatingStar from '@/components/RatingStar/RatingStar'
import AppButton from '@/components/shard/AppButton/AppButton'
import AppSlider from '@/components/Slider/slider'


export default async function page({ params }: { params: { hamada: string } }) {
  const { hamada } = await params
  // console.log(hamada);

  const ProductDetils = await getSingleProduct(hamada)
  // console.log("ProductkDetils",ProductDetils);

  const { id, brand, images, price, quantity, category, title, imageCover, ratingsAverage, ratingsQuantity, description } = ProductDetils
  return (
<> 
      <h2>Product Detils</h2>
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <AppSlider imageslist={images} spaceBetween={0} detials={true}  navigation={false}/>
          {/* <Image width={150 } height={150} src={imageCover} alt={title} />  */}
          </div>
          <div className="col-span-9">
            <div className="flex ">
              <span>{category.name}</span>
              <span>{brand.name}</span>
            </div>
            <h2>{title}</h2>
            <div className="flex items-center ">
              <RatingStar ratingsAverage={ratingsAverage} ratingsQuantity={ratingsQuantity} Review={"Review"} />
            </div>
            {quantity > 0 ? <span className="text-green-600 p-2 bg-green-100 rounded-2xl">In Stock</span> : <span className="text-red-600 p-2 bg-red-100 rounded-2xl">Out of Stock</span>}
            {description}
            <AppButton className='bg-main-color' id={id} quantity={quantity}>Buy Now</AppButton>
          </div>
        </div>


      </>  )
}
