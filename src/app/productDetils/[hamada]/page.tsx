import { getreviewProduct, getSingleProduct } from '@/app/home.services'
import ButtonIncreaseAndDecrease from '@/components/ButtonIncreaseAndDecrease/ButtonIncreaseAndDecrease'
import ProductTabs from '@/components/productReviews/ProductReviews'
import RatingStar from '@/components/RatingStar/RatingStar'
import AppButton from '@/components/shard/AppButton/AppButton'
import AppButtonW from '@/components/shard/AppButton/AppButtonW'
import AppSlider from '@/components/Slider/slider'
import { Heart, Share2, ShoppingCart, Zap, Truck, RotateCcw, ShieldCheck } from 'lucide-react'

export default async function page({ params }: { params: { hamada: string } }) {
  const { hamada } = await params
  const reviews = await getreviewProduct(hamada)
  const ProductDetils = await getSingleProduct(hamada)
  const {
    id, brand, images, price, quantity, category, title,
    priceAfterDiscount, ratingsAverage, ratingsQuantity, description
  } = ProductDetils

  const normalizedProduct = {
    ...ProductDetils,
    sold: ProductDetils.sold ?? 0,
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className="flex flex-col md:flex-row gap-8 items-start">

        {/* ===== LEFT: Sticky Image ===== */}
        <div className=" w-full md:w-[38%] md:sticky md:top-6 self-start">
          <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white p-4">
            <AppSlider
              imageslist={images}
              spaceBetween={0}
              detials={true}
              navigation={false}
            />
          </div>
        </div>

        {/* ===== RIGHT: Product Info ===== */}
        <div className=" md:flex-1 w-full md:w-[62%]  md:min-w-0  mt-2.5 md:mt-0">

          {/* Breadcrumb tags */}
          <div className="flex gap-2 mb-4">
            <span className="text-sm text-main-color bg-min-color border border-main-color py-1 px-3 rounded-full font-medium">
              {category.name}
            </span>
            <span className="text-sm text-gray-600 bg-gray-100 border border-gray-200 py-1 px-3 rounded-full font-medium">
              {brand.name}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
                        <RatingStar ratingsAverage={ratingsAverage} ratingsQuantity={ratingsQuantity} Review={"Review"} />

          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            {priceAfterDiscount ? (
              <>
                <span className="text-3xl font-bold text-gray-900">
                  {priceAfterDiscount} EGP
                </span>
                <span className="text-lg text-gray-400 line-through">
                  {price} EGP
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-900">
                {price} EGP
              </span>
            )}
          </div>

          {/* Stock status */}
          <div className="mb-5">
            {quantity > 0 ? (
              <span className="inline-flex items-center gap-1.5 text-main-color bg-min-color border border-main-color py-1.5 px-3 rounded-full text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-main-color inline-block" />
                In Stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-red-700 bg-red-50 border border-red-200 py-1.5 px-3 rounded-full text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                Out of Stock
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-6 border-b border-gray-100 pb-6">
            {description}
          </p>

          {/* Quantity */}
          <div className="mb-6">
            <ButtonIncreaseAndDecrease price={price} />
          </div>

          {/* Total Price
          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-5 py-3 mb-6 border border-gray-100">
            <span className="text-gray-500 font-medium">Total Price:</span>
            <span className="text-green-600 font-bold text-xl">{price}.00 EGP</span>
          </div> */}

          {/* CTA Buttons */}
          <div className="flex gap-3 mb-3 ">
            <AppButton
              className="flex-1 bg-main-color/80 h-14 hover:bg-main-color text-white py-4 text-base font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
              id={id}
              quantity={quantity}
            >
              <ShoppingCart size={18} />
              Add to Cart
            </AppButton>

            <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-4 text-base font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors">
              <Zap size={18} />
              Buy Now
            </button>
          </div>

          {/* Wishlist + Share */}
          <div className="flex gap-3 mb-8">
            <AppButtonW
              className="flex-1 border h-14 border-gray-200 hover:border-gray-400 text-white   py-3 text-sm font-medium rounded-xl flex items-center justify-center gap-2 transition-colors"
              id={id}
              quantity={quantity}
            >
              <Heart size={16} />
              Add to Wishlist
            </AppButtonW>

            <button className="w-12 h-12 border border-gray-200 hover:border-gray-400 rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors">
              <Share2 size={16} />
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-min-color/40 flex items-center justify-center shrink-0">
                <Truck size={18} className="text-main-color" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Free Delivery</p>
                <p className="text-xs text-gray-500">Orders over 550</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-min-color/40 flex items-center justify-center shrink-0">
                <RotateCcw size={18} className="text-main-color" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">30 Days Return</p>
                <p className="text-xs text-gray-500">Money back</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-min-color/40 flex items-center justify-center shrink-0">
                <ShieldCheck size={18} className="text-main-color" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Secure Payment</p>
                <p className="text-xs text-gray-500">100% Protected</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Product Tabs below */}
      <div className="mt-12">
        <ProductTabs product={normalizedProduct} />
      </div>
    </div>
  )
}