import { CiStar } from "react-icons/ci";
import { IoMdStar, IoMdStarHalf } from "react-icons/io";

export default function RatingStar({ ratingsAverage, ratingsQuantity , Review }: { ratingsAverage: number, ratingsQuantity: number , Review?:string}) {
    const fullstars = Math.floor(ratingsAverage)
    const halfstar = ratingsAverage % 1 >= 0.5
    const emptystar = 5 - fullstars - (halfstar ? 1 : 0)
    return (
        <>
            {Array.from({ length: fullstars }).map((el, index) => (<IoMdStar className="text-[30px]" fill="yellow" color="yellow" key={index} />))}
            {halfstar && <IoMdStarHalf className="text-[30px]" fill="yellow" color="yellow" />}
            {Array.from({ length: emptystar }).map((el, index) => (<CiStar className="text-[30px]" color="yellow" key={index} />))}
            <span>{ratingsAverage}</span> ({ratingsQuantity} {Review})


        </>)
}
