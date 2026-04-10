"use client"
import { Input } from "@/components/ui/input"
import logo from "../../asssets/img/icon.png"
import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import { FaGift, FaHeadset, FaPhone, FaShoppingCart, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa"
import { CiHeart, CiMail, CiUser } from "react-icons/ci"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from "@/app/_Redux/ReduxStore"
import GlobalColorSwitcher from "../GlobalColorSwitcher/GlobalColorSwitcher"

// Categories dropdown data — replace with API data if needed
const categories = [
  { title: "All Categories", href: "/Categories" },
  { title: "Electronics", href: "/Categories/electronics" },
  { title: "Women's Fashion", href: "/Categories/womens-fashion" },
  { title: "Men's Fashion", href: "/Categories/mens-fashion" },
  { title: "Beauty & Health", href: "/Categories/beauty-health" },
]

export default function Navbar() {
  const session = useSession()
  const username = session.data?.user?.name
  const isAuthenticated = session.status === "authenticated"
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)

  const cartNumber = useSelector((state: RootState) => state.cart.cartNumber)
  const wishNumber = useSelector((state: RootState) => state.cart.wishNumber)

  async function handleLogOut() {
    await signOut({ redirect: false })
    router.push("/Login")
  }

  return (
    <>
      {/* ── Top bar ── */}
      <div className="hidden lg:flex container mx-auto text-gray-600 text-xs items-center justify-between py-2.5 border-b border-gray-100">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5">
            <FaGift className="text-main-color" />
            Free Shipping on Orders 500 EGP
          </span>
          <span className="flex items-center gap-1.5">
            <FaGift className="text-main-color" />
            New Arrivals Daily
          </span>

        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><FaPhone className="text-main-color" /> +1 (800) 123-4567</span>
          <span className="flex items-center gap-1.5"><CiMail className="text-main-color" /> support@freshcart.com</span>
          <span className="flex items-center gap-1.5 pl-3 border-l border-gray-300">
            <CiUser />
            {isAuthenticated ? username : ""}
          </span>
          {isAuthenticated
            ? <button onClick={handleLogOut} className="flex items-center gap-1 hover:text-main-color transition-colors">Sign Out <FaSignOutAlt /></button>
            : <>
              <Link href="/Login" className="hover:text-main-color transition-colors">Sign In</Link>
              <Link href="/Register" className="flex items-center gap-1 hover:text-main-color transition-colors"><CiUser /> Sign Up</Link>
            </>
          }
        </div>
      </div>

      {/* ── Main navbar ── */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
            <Image src={logo} alt="FreshCart logo" width={26} height={26} />
            <span className="text-sm lg:text-2xl font-bold text-gray-800">FreshCart</span>
          </Link>

          {/* Search — desktop */}
          {isAuthenticated && (
            <div className="hidden lg:flex relative w-1/3">
              <Input
                type="search"
                placeholder="Search for products, brands and more..."
                className="pr-10 rounded-full border-gray-300 focus:border-main-color"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-main-color">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                </svg>
              </button>
            </div>
          )}

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            <Link href="/" className="px-3 py-2 text-sm text-gray-700 hover:text-main-color transition-colors">Home</Link>
            <Link href="/shop" className="px-3 py-2 text-sm text-gray-700 hover:text-main-color transition-colors">Shop</Link>

            {/* Categories dropdown */}
            <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
              <button className="flex items-center gap-1 px-3 py-2 text-sm text-main-color font-medium hover:text-main-color transition-colors">
                Categories
                <svg className={`w-3.5 h-3.5 transition-transform ${catOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {catOpen && (
                <div className="absolute top-full left-0 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {categories.map((cat) => (
                    <Link key={cat.href} href={cat.href} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-main-color transition-colors">
                      {cat.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/brand" className="px-3 py-2 text-sm text-gray-700 hover:text-main-color transition-colors">Brands</Link>
          </div>
          <div className="  ">
            <GlobalColorSwitcher />
          </div>
          {/* Right icons */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Support */}
            <div className="hidden lg:flex items-center gap-2">
              <FaHeadset className="text-main-color w-5 h-5" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-semibold text-gray-700">Support</span>
                <span className="text-[10px] text-gray-400">24/7 Help</span>
              </div>
            </div>

            {/* Wishlist */}
            <div className="relative">

              <Link href="/wishlist" className="text-gray-600 hover:text-main-color transition-colors">
                <CiHeart className="w-6 h-6" />
              </Link>
              {isAuthenticated && !!wishNumber && (
                <span className="absolute -top-2 left-3 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">{wishNumber}</span>
              )}
            </div>

            {/* Cart */}
            <div className="relative">
              <Link href="/cart" className="text-gray-600 hover:text-main-color transition-colors">
                <FaShoppingCart className="w-5 h-5" />
              </Link>
              {isAuthenticated && !!cartNumber && (
                <span className="absolute -top-2 left-3 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">{cartNumber}</span>
              )}
            </div>

            {/* Auth button */}
            {isAuthenticated
              ? <button onClick={handleLogOut} className="hidden lg:flex items-center gap-1 bg-main-color text-white text-sm px-2 py-2 rounded-full hover:opacity-90 transition-opacity">
                <CiUser className="w-4 h-4" /> {username}
              </button>
              : <Link href="/Login" className="flex items-center gap-1.5 bg-main-color text-white text-sm px-2 py-2 rounded-full hover:opacity-90 transition-opacity">
                <CiUser className="w-3.5 h-3.5 text-sm   lg:w-4 lg:h-4 " /> Sign In
              </Link>
            }

            {/* Mobile hamburger */}
            <button className="lg:hidden text-gray-700" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <FaTimes className="w-4 h-4" /> : <FaBars className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
            {/* Mobile search */}
            <div className="relative mb-3">
              <Input type="search" placeholder="Search products..." className="pr-10 rounded-full" />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-main-color">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                </svg>
              </button>
            </div>

            <Link href="/" onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm text-gray-700 border-b border-gray-50">Home</Link>
            <Link href="/shop" onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm text-gray-700 border-b border-gray-50">Shop</Link>

            {/* Mobile categories */}
            <div>
              <button onClick={() => setCatOpen(!catOpen)} className="flex items-center justify-between w-full py-2.5 text-sm text-gray-700 border-b border-gray-50">
                Categories
                <svg className={`w-3.5 h-3.5 transition-transform ${catOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {catOpen && (
                <div className="pl-4 space-y-1 py-1">
                  {categories.map((cat) => (
                    <Link key={cat.href} href={cat.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-gray-600 hover:text-main-color">
                      {cat.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/brand" onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm text-gray-700 border-b border-gray-50">Brands</Link>

            {isAuthenticated && (
              <>
                <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="flex items-center justify-between py-2.5 text-sm text-gray-700 border-b border-gray-50">
                  Wishlist {!!wishNumber && <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">{wishNumber}</span>}
                </Link>
                <Link href="/cart" onClick={() => setMobileOpen(false)} className="flex items-center justify-between py-2.5 text-sm text-gray-700 border-b border-gray-50">
                  Cart {!!cartNumber && <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">{cartNumber}</span>}
                </Link>
              </>
            )}

            {isAuthenticated
              ? <button onClick={() => { handleLogOut(); setMobileOpen(false) }} className="flex items-center gap-2 py-2.5 text-sm text-red-500 w-full">
                <FaSignOutAlt /> Sign Out
              </button>
              : <div className="flex gap-3 pt-2">
                <Link href="/Login" onClick={() => setMobileOpen(false)} className="flex-1 text-center bg-main-color text-white text-sm py-2.5 rounded-full">Sign In</Link>
                <Link href="/Register" onClick={() => setMobileOpen(false)} className="flex-1 text-center border border-main-color text-main-color text-sm py-2.5 rounded-full">Sign Up</Link>
              </div>
            }
          </div>
        )}
      </nav>
    </>
  )
}