import { AllProductData, AllProductResponse, productDetilsResponse } from "./homeInterface";

export  async function getAllProducts( ): Promise<AllProductData[]>  {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`,
      {
        cache: "force-cache",
      }
    );
    const data : AllProductResponse = await res.json();
    return data.data
  }

  export async function getSingleProduct(id:string): Promise<AllProductData>  {
    const res =await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`);
    const data : productDetilsResponse = await res.json();
    return data.data
  }