import CardProduct from "@/components/card/Card";
import { getAllProducts } from "./home.services";
import AppSlider from "@/components/Slider/slider";
import img from "../asssets/img/port2.png"

import img2 from "../asssets/img/port3.png"
import img3 from "../asssets/img/poert1.png"
// import AllCategories from "@/components/AllCategories/AllCategories";
import { lazy, Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

const imageslist = [img.src, img2.src, img3.src]
const AllCategories = lazy(() => import("@/components/AllCategories/AllCategories"))
export default async function page() {
  const products = await getAllProducts()
 
  return (
    <>
      <div className="">

    <AppSlider spaceBetween={0} imageslist={imageslist} />

      </div>
      <Suspense fallback={<div className="bg-black flex justify-center  h-80  text-white items-center">   <Spinner /></div>}>
        <AllCategories className="hover:text-main-color    text-center" imdgclass="rounded-full" />
      </Suspense>
      {/* <AllCategories className="hover:text-main-color    text-center" imdgclass="rounded-full" /> */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 container mx-auto my-5 gap-5 ">
        {products.map((pro) => { return <CardProduct key={pro.id} data={pro} /> })}

      </div>

    </>)
}
