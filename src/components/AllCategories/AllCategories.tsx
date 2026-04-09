import { getAllCategories } from "@/app/Categories/Categories.services"
import { Card, CardHeader, CardTitle } from "../ui/card"
import Image from "next/image"
  
export default async function AllCategories({ className, imdgclass,children }: { className?: string, imdgclass?: string ,children?: React.ReactNode}) {


  const categories = await getAllCategories()

  return (
    <>

      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 container mx-auto my-5 gap-5  ">
        {categories.map((cat) => {
          return <Card key={cat._id} className={`relative group  text-center mx-auto w-full max-w-sm pt-3  hover:shadow-xl duration-75 hover:scale-105 ${className} `}>
            <div className={`absolute inset-0 z-30  `} />
            <div className={`relative h-25 w-20 mx-auto `} >
              <Image
                fill
                src={cat.image}
                alt="Event cover"
                className={`relative z-20 w-full   ${imdgclass}`}
              />
            </div>
            <CardHeader>

              <CardTitle>{cat.name}</CardTitle>
              {children}
             
            </CardHeader>

          </Card>
        })}
      </div>
    </>
  )
}
