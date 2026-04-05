import AllCategories from '@/components/AllCategories/AllCategories'
import TopPageCategoriesBrandShop from '@/components/TopPageCategoriesBrandShop/TopPageCategoriesBrandShop'
import { CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { ArrowRight } from 'lucide-react'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <>
    <TopPageCategoriesBrandShop nameof={"Categories"} color={"bg-main-color/90"} pragraoh={"Browse our wide range of product categories"} link={"Categories"}/>
    <Suspense fallback={<div className="bg-black flex justify-center  h-80  text-white items-center">   <Spinner /></div>}>
            <AllCategories className="hover:text-main-color   text-center" imdgclass="rounded-3xl "  >
               <CardTitle className="opacity-0  flex justify-center items-center gap-1.5 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 text-[12px] transition-all duration-300"
              >View Subcategories <ArrowRight size={15} /> </CardTitle></AllCategories>
          </Suspense>
    
    
    
    
    
    </>
  )
}
