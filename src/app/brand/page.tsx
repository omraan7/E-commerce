import TopPageCategoriesBrandShop from '@/components/TopPageCategoriesBrandShop/TopPageCategoriesBrandShop'
import React from 'react'
import { getAllBrands } from './brand.servise'
import BrandCart from './brandcart';

export default async function page() {
    const data = await getAllBrands()
 
  return (
 <>

 
 <TopPageCategoriesBrandShop nameof={"brand"} color={"bg-second-color/90"} pragraoh={"Shop from your favorite brands"} link={"brand"}/>
 <BrandCart/>
 </>
  )
}
