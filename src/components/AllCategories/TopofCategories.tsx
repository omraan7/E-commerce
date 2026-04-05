import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function TopofCategories() {
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


</>  )
}
