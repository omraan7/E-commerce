import { AllCategoriesData, AllCategoriesResponse } from "./CategorisInterface";

export async function getAllCategories() :Promise<AllCategoriesData[]>  {
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`,);
const data: AllCategoriesResponse = await res.json();
return data.data

}