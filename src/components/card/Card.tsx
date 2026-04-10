import { AllProductData } from "@/app/homeInterface"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardAction,

    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CirclePlus, Eye } from "lucide-react"
import Image from "next/image"
import AppButton from "../shard/AppButton/AppButton"
import { CiHeart } from "react-icons/ci"

import Link from "next/link"
import RatingStar from "../RatingStar/RatingStar"
import AppButtonW from "../shard/AppButton/AppButtonW"
import { FaRegEye } from "react-icons/fa"

export default function CardProduct({ data }: { data: AllProductData }) {
    const { id, imageCover, title, category, price, quantity, priceAfterDiscount, ratingsAverage, ratingsQuantity, sold } = data

    // console.log(ratingsAverage);


    return (
        <>

            <Card className="relative mx-auto w-full     hover:scale-102 hover:shadow-xl duration-75 my-2       ">
                {/* <div className="absolute inset-0 z-30  " /> */}
                <div className="relative h-80 w-[80%] mx-auto rounded-lg ">
                    < Link href={`/productDetils/${id}`}>
                        <Image
                            fill
                            src={imageCover}
                            alt="Event cover"
                            className="relative z-20 aspect-square w-full    "
                        />
                    </Link>

                </div>
                <AppButtonW id={id} className=" bg-main-color  absolute top-4 right-4  z-40   text-white  hover:bg-white hover:text-green-600" quantity={quantity || 0}>  <CiHeart /></AppButtonW>
                < Link href={`/productDetils/${id}`} className=" bg-main-color  absolute top-15 right-4  z-40   text-white  rounded-md h-8 w-9 flex items-center justify-center hover:bg-white hover:text-green-600"><FaRegEye /> </Link>
                <CardHeader className="h-30 mt-1  " >

                    <CardTitle className="flex flex-col" >
                        <Badge variant="secondary" className=" bg-transparent hover:text-main-color p-0 m-y-2">{category.name}</Badge>

                        <h2 className=" hover:text-main-color ">{title.split(" ", 3).join(" ")}</h2>

                    </CardTitle>
                    <div className="  flex  items-center">
                        <RatingStar ratingsAverage={ratingsAverage} ratingsQuantity={ratingsQuantity} />
                    </div>

                    {/* <CardDescription className="w-full bg-amber-400">
                            {description && description.slice(0, 50)}
                        </CardDescription> */}
                    <div className=" flex gap-1 text-sm md:gap-2 md:text-md  font-bold justify-between w-full   ">
                        {priceAfterDiscount ? <> <span className="text-main-color">{priceAfterDiscount} EGP</span> <span className="text-gray-400 line-through">{price} EGP</span> </> : <span className="text-black">{price} EGP</span>}
                        <AppButton id={id} className=" bg-main-color     text-white  hover:bg-white hover:text-main-color" quantity={quantity || 0}><CirclePlus /></AppButton>

                    </div>

                </CardHeader>

            </Card>







        </>)
}
