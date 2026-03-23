import { AllProductData } from "@/app/homeInterface"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CirclePlus, Star } from "lucide-react"
import Image from "next/image"
import AppButton from "../shard/AppButton/AppButton"
import { IoMdStar, IoMdStarHalf } from "react-icons/io"
import { CiHeart, CiStar } from "react-icons/ci"
 
import Link from "next/link"
import RatingStar from "../RatingStar/RatingStar"
import AppButtonW from "../shard/AppButton/AppButtonW"

export default function CardProduct({ data }: { data: AllProductData }) {
    const { id, imageCover, title, category, description, price, quantity, priceAfterDiscount, availableColors, ratingsAverage, ratingsQuantity, sold } = data
    
    // console.log(ratingsAverage);
    

    return (
        <>
            
                <Card className="relative mx-auto w-full       ">
                    {/* <div className="absolute inset-0 z-30  " /> */}
                    <div className="relative h-80 w-[75%] mx-auto rounded-lg ">
                    < Link href={`/productDetils/${id}`}>
                        <Image
                            fill
                            src={imageCover}
                            alt="Event cover"
                            className="relative z-20 aspect-square w-full    "
                        />
                        </Link>

                    </div>
                        <AppButtonW  id={id} className=" bg-green-600  absolute top-2 right-2  z-40  text-white  hover:bg-white hover:text-green-600"  quantity={quantity || 0}>  <CiHeart /></AppButtonW>
                    <CardHeader className="h-30 mt-1  " >
                        <CardAction >
                        </CardAction>
                        <CardTitle className="flex flex-col" >
                            <Badge variant="secondary" className=" bg-transparent p-0 m-y-2">{category.name}</Badge>

                            <h2>{title.split(" ", 3).join(" ")}</h2>

                        </CardTitle>
                        <div className=" flex    items-center">
                           <RatingStar ratingsAverage={ratingsAverage} ratingsQuantity={ratingsQuantity}/>
                        </div>

                        {/* <CardDescription className="w-full bg-amber-400">
                            {description && description.slice(0, 50)}
                        </CardDescription> */}
                        <div className=" flex gap-2 font-bold justify-between w-full   ">
                            {priceAfterDiscount ? <> <span className="text-green-600">{priceAfterDiscount} EGP</span> <span className="text-gray-400 line-through">{price} EGP</span> </> : <span className="text-black">{price} EGP</span>}
                        <AppButton  id={id} className=" bg-green-600    text-white  hover:bg-white hover:text-green-600"  quantity={quantity || 0}><CirclePlus /></AppButton>

                        </div>

                    </CardHeader>

                </Card>




        


        </>)
}
