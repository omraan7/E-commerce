import Link from "next/link";
import { getAllBrands } from "./brand.servise";
import { Brand } from "../homeInterface";

export default async function BrandCart() {
  const brands: Brand[] = await getAllBrands();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 container mx-auto my-5 gap-5">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            href={`/brand/${brand._id}`}
            className="relative group text-center mx-auto w-full pt-3 pb-5 px-4 rounded-2xl border border-gray-100 bg-white hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden flex flex-col items-center"
          >
            {/* Logo */}
            <div className="h-28 w-full flex items-center justify-center">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Name — hidden on hover */}
            <p className="mt-3 text-sm font-medium text-gray-700 group-hover:opacity-0 transition-opacity duration-200">
              {brand.name}
            </p>

            {/* View Products — shown on hover */}
            <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <p className="text-sm font-semibold text-main-color">{brand.name}</p>
              <p className="text-xs text-main-color mt-0.5">View Products →</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}