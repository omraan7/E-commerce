import { BrandsResponse } from "./Brandinterface";

export async function getAllBrands() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands?limit=30`);
    const data: BrandsResponse = await res.json();
    
    return data.data
    
}