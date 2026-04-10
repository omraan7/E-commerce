import CardProduct from "@/components/card/Card";
import { getAllProducts } from "./home.services";
import AppSlider from "@/components/Slider/slider";
import img from "../asssets/img/port2.png"

import img2 from "../asssets/img/port3.png"
import img3 from "../asssets/img/poert1.png"
// import AllCategories from "@/components/AllCategories/AllCategories";
import { lazy, Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import TopofCategories from "@/components/AllCategories/TopofCategories";
import PromoBanners from "@/components/cartHome/CartHome";
import { Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";
const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over 500 EGP" },
  { icon: RotateCcw, title: "Easy Returns", desc: "14-day return policy" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure checkout" },
  { icon: Headphones, title: "24/7 Support", desc: "Contact us anytime" },
];

const imageslist = [img.src, img2.src, img3.src]
const AllCategories = lazy(() => import("@/components/AllCategories/AllCategories"))
export default async function page() {
  const products = await getAllProducts()

  return (
    <>
      <div className=" ">

        {/* <AppSlider spaceBetween={0} imageslist={imageslist} /> */}
        <AppSlider
          slides={[
            {
              image: imageslist[0],
              title: "Fresh Products Delivered<br/>to your Door",
              subtitle: "Get 20% off your first order",
              primaryBtn: { label: "Shop Now" },
              secondaryBtn: { label: "View Deals" },
            },
            {
              image: imageslist[1],
              title: "Big Sale On Vegetables 🥦",
              subtitle: "Save up to 30% today only",
              primaryBtn: { label: "Explore Now", href: "/Categories" },
              secondaryBtn: { label: "Offers" },
            },
            {
              image: imageslist[2],
              title: "Fast Delivery ⚡",
              subtitle: "Delivered within 24 hours",
              primaryBtn: { label: "Order Now" },
            },
          ]}
        />
      </div>
      <div className=" container mx-auto flex  flex-wrap   justify-around     gap-2 ">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex items-center bg-white gap-2 w-full   sm:w-1/2  md:w-1/5 h-15 p-5 py-10 
                   hover:shadow-xl hover:shadow-main-color/30 hover:scale-102 
                                                                               my-2 border rounded-2xl px-3"
          >            <div className=" text-sm md:tex-md w-9 h-9 md:w-11 md:h-11 bg-main-color/5 rounded-xl flex items-center justify-center shrink-0">
              <Icon size={22} className="text-main-color/90" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{title}</p>
              <p className="text-xs text-gray-600">{desc}</p>
            </div>
          </div>
        ))}
      </div>
      <TopofCategories />
      <Suspense fallback={<div className="bg-main-color flex justify-center  h-80  text-white items-center">   <Spinner /></div>}>
        <AllCategories className="hover:text-main-color    text-center" imdgclass="rounded-full" />
      </Suspense>
      <div className="container mx-auto">
        <PromoBanners />
      </div>
      {/* <AllCategories className="hover:text-main-color    text-center" imdgclass="rounded-full" /> */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 container mx-auto my-5 gap-5 ">
        {products.map((pro) => { return <CardProduct key={pro.id} data={pro} /> })}

      </div>

    </>)
}
