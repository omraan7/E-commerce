import { getAllCategories } from "@/app/Categories/Categories.services"
import { Card, CardHeader, CardTitle } from "../ui/card"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default async function AllCategories({ className, imdgclass }: { className?: string, imdgclass?: string }) {


  const categories = await getAllCategories()

  return (
    <>

      <div className=" container mx-auto h-20 flex  gap-3 items-center justify-between">
        <div className="flex  gap-3 items-center"> <div className="w-2 h-8 rounded-2xl bg-main-color "> </div>
          <div className="text-2xl font-bold">
            Shop By <span className="text-main-color">Category</span> </div></div>
        <div className="">
          <Link href="Categories" className="text-main-color flex items-center gap-2">View All Categories <ArrowRight /></Link>
        </div>
      </div>
      <div className="   grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 container mx-auto my-5 gap-5  ">
        {categories.map((cat) => {
          return <Card key={cat._id} className={`relative text-center mx-auto w-full max-w-sm pt-3  hover:shadow-xl duration-75 hover:scale-105 ${className} `}>
            <div className={`absolute inset-0 z-30  `} />
            <div className={`relative h-20 w-20 mx-auto `} >
              <Image
                fill
                src={cat.image}
                alt="Event cover"
                className={`relative z-20  rounded-full  w-full   ${imdgclass}`}
              />
            </div>
            <CardHeader>

              <CardTitle>{cat.name}</CardTitle>

            </CardHeader>

          </Card>
        })}
      </div>
    </>
  )
}
