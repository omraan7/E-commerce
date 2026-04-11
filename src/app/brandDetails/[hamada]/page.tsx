import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/app/home.services";
import { AllProductData } from "@/app/homeInterface";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import AppButtonW from "@/components/shard/AppButton/AppButtonW";
import {  CirclePlus } from "lucide-react";
import RatingStar from "@/components/RatingStar/RatingStar";
import AppButton from "@/components/shard/AppButton/AppButton";
import { CiHeart } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";

 
interface BrandDetailsPageProps {
  params: { hamada: string };
}

interface BrandInfo {
  _id: string;
  name: string;
  image: string;
  slug: string;
}

 
export default async function BrandDetailsPage({ params }: BrandDetailsPageProps) {

  const { hamada } = await params;
  console.log("hamada", hamada);



  const allProducts: AllProductData[] = await getAllProducts();


  // Filter products by hamada — handles both object and string brand
  const products = allProducts.filter((p) => {
    const id = typeof p.brand === "object" ? p.brand._id : p.brand;
    return id === hamada;
  });

  // Extract brand info from first matching product
  const brand: BrandInfo | null =
    products.length > 0 && typeof products[0].brand === "object"
      ? products[0].brand
      : null;

  if (!brand) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <p className="text-lg font-medium">Brand not found.</p>
          <Link
            href="/brand"
            className="mt-4 inline-block text-sm text-main-color hover:underline"
          >
            ← Back to Brands
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

       <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-main-color transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/brand" className="hover:text-main-color transition-colors">
            Brands
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{brand.name}</span>
        </nav>
      </div>

       <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-40 h-24 flex items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 p-4 shrink-0">
            <img
              src={brand.image}
              alt={brand.name}
              width={140}
              height={80}
              className="object-contain w-full h-full"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{brand.name}</h1>
            <p className="text-gray-500 mt-1">
              {products.length} product{products.length !== 1 ? "s" : ""} available
            </p>
          </div>
        </div>
      </section>

       <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-8">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <p className="text-lg font-medium">No products found for this brand.</p>
              <Link
                href="/brand"
                className="mt-4 text-sm text-main-color hover:underline"
              >
                ← Back to Brands
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {products.map((product) => (<Card key={product._id} className="relative mx-auto w-full     hover:scale-102 hover:shadow-xl duration-75 my-2       ">
                {/* <div className="absolute inset-0 z-30  " /> */}
                <div className="relative h-80 w-[80%] mx-auto rounded-lg ">
                  < Link href={`/productDetils/${product.id}`}>
                    <Image
                      fill
                      src={product.imageCover}
                      alt="Event cover"
                      className="relative z-20 aspect-square w-full    "
                    />
                  </Link>

                </div>
                <AppButtonW id={product.id} className=" bg-main-color  absolute top-4 right-4  z-40   text-white  hover:bg-white hover:text-green-600" quantity={product.quantity || 0}>  <CiHeart /></AppButtonW>
                < Link href={`/productDetils/${product.id}`} className=" bg-main-color  absolute top-15 right-4  z-40   text-white  rounded-md h-8 w-9 flex items-center justify-center hover:bg-white hover:text-green-600"><FaRegEye /> </Link>
                <CardHeader className="h-30 mt-1  " >

                  <CardTitle className="flex flex-col" >
                    <h2 className=" bg-transparent hover:text-main-color p-0 m-y-2">{product.category.name}</h2>

                    <h2 className=" hover:text-main-color ">{product.title.split(" ", 3).join(" ")}</h2>

                  </CardTitle>
                  <div className="  flex  items-center">
                    <RatingStar ratingsAverage={product.ratingsAverage} ratingsQuantity={product.ratingsQuantity} />
                  </div>

                  <div className=" flex gap-1 text-sm md:gap-2 md:text-md  font-bold justify-between w-full   ">
                    {product.priceAfterDiscount ? <> <span className="text-main-color">{product.priceAfterDiscount} EGP</span> <span className="text-gray-400 line-through">{product.price} EGP</span> </> : <span className="text-black">{product.price} EGP</span>}
                    <AppButton id={product.id} className=" bg-main-color     text-white  hover:bg-white hover:text-main-color" quantity={product.quantity || 0}><CirclePlus /></AppButton>

                  </div>

                </CardHeader>

              </Card>)

              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}


