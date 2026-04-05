import CardProduct from '@/components/card/Card';

import { getAllProducts } from '../home.services';

import TopPageCategoriesBrandShop from '@/components/TopPageCategoriesBrandShop/TopPageCategoriesBrandShop';

export default async function page() {
  const products = await getAllProducts()

  return (
    <>
<TopPageCategoriesBrandShop nameof={"products"} color={"bg-main-color/90"} pragraoh={"Explore our complete product collection"} link={"shop"}/>
     


      <div className="flex  p-5 gap-3 items-center"> <div className="w-2 h-8 rounded-2xl bg-main-color "></div>
        <p className=' text-md text-main-color/80'>Showing {products.length} products</p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 container mx-auto my-5 gap-5 ">
        {products.map((pro) => { return <CardProduct key={pro.id} data={pro} /> })}

      </div>
    </>
  )
}
