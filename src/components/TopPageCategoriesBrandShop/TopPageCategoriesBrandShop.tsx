import { Box } from 'lucide-react'
import Link from 'next/link'

interface TopPageProps {
  nameof: string;
  color?: string;
  pragraoh: string;
  link: string;
}

export default function TopPageCategoriesBrandShop({ nameof, color, pragraoh, link }: TopPageProps) {
  return (
    <>
      <div className={`w-full px-32 ${color} bg-main-color/90 py-5 h-40`}>
        <div className="max-w-6xl mx-auto px-4 pt-4 pb-2">
          <nav className="text-sm text-white flex items-center gap-1">
            <Link href="/" className="hover:text-gray-200">Home</Link>
            <span>/</span>
            <Link href={`/${link}`} className="hover:text-gray-200">{link}</Link>
          </nav>
        </div>
        <div className="flex items-center gap-2 ">
          <Box size={40} color='white' />
          <div className="text-white">
            <h1 className="text-3xl font-bold">All {nameof}</h1>
            <p>{pragraoh}</p>
          </div>
        </div>
      </div>
    </>
  )
}