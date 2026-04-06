"use client"
import { Input } from "@/components/ui/input"
import logo from "../../asssets/img/icon.png"
import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { FaGift, FaHeadset, FaPhone, FaRegIdCard, FaShoppingCart, FaShuttleVan, FaSignOutAlt } from "react-icons/fa"
import { CiHeart, CiMail, CiUser } from "react-icons/ci"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
// import { useCartContext } from "@/app/_context/CartContextProvider"
import GlobalColorSwitcher from "../GlobalColorSwitcher/GlobalColorSwitcher"
import { useSelector } from "react-redux"
import { RootState } from "@/app/_Redux/ReduxStore"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export default function NavigationMenuDemo() {
  const session = useSession()
  console.log("session",session);
  const username = session.data?.user?.name
  const isAuthenticated = session.status === "authenticated"
  const router = useRouter()
  async function HandelLogOut() {
    await signOut({ redirect: false })
    router.push("/Login")
  }

const cartNumber = useSelector((state:RootState) => state.cart.cartNumber);
  const wishNumber = useSelector((state:RootState) => state.cart.wishNumber);  
  // const { cartNumber } = useCartContext()
  // const { wishNumber } = useCartContext()


  return (
    <>
      <div className=" hidden container mx-auto text-gray-800 text-xs lg:flex items-center justify-between py-3">
        <div className=" flex items-center justify-between gap-4.5 ">
          <span className="flex items-center gap-2 text-xs"> <FaShuttleVan color="#16A34A" />
            Free Shipping on Orders 500 EGP</span>
          <span className="flex items-center gap-2 text-xs"> <FaGift color="#16A34A" />
            New Arrivals Daily</span>
        </div>
        <div className="  flex items-center gap-2 text-xs">
          <div className=" flex items-center gap-2 text-xs  px-2">
            <FaPhone /> +1 (800) 123-4567

            <CiMail /> support@freshcart.com
          </div>
          <div className=" flex items-center gap-2 text-xs pl-3 border-l border-gray-400  ">
            <CiUser />{isAuthenticated ? username : "user "}

            {isAuthenticated ? <> <button onClick={HandelLogOut}>Logout</button>   <FaSignOutAlt /> </> : "Login"}
          </div>

        </div>

      </div>
      <nav className="container mx-auto py-2      ">


        <NavigationMenu className="max-w-none justify-between " viewport={false} >
          <Link href="/" className="flex   self-start items-center gap-2 text-bold">
            <Image src={logo} alt="logo" />
            <span className="text-2xl font-bold">   Frish Cart</span>

          </Link>
          {isAuthenticated ? <>
            <Input type="search" placeholder="Search..." className=" hidden lg:flex w-1/4" />
            <NavigationMenuList className="flex gap-5 justify-between">


              <NavigationMenuItem className="flex justify-around bg-amber-800 ">

              </NavigationMenuItem>

              <NavigationMenuItem className="hidden lg:flex">
                <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} hover:bg-transparent hover:text-green-600`}>
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
               <NavigationMenuItem className="hidden lg:flex">
                <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} hover:bg-transparent hover:text-green-600`}>
                  <Link href="/shop">Shop</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem className="hidden lg:flex">
                <NavigationMenuTrigger><Link href="/Categories">Categories  fgdfgfd</Link></NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-100 ">
                    {components.map((component) => (
                      <ListItem
                        className="z-9999"
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem className="hidden lg:flex">
                <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} hover:bg-transparent hover:text-green-600`}>
                  <Link href="/brand">brand</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} hover:bg-transparent hover:text-green-600`}>
                  <div className="flex gap-2">
                    <FaHeadset className="hidden lg:block" />
                    <div className=" hidden lg:flex flex-col">
                      <span>Support
                      </span>
                      <span>
                        24/7 Help
                      </span>
                    </div>

                  </div>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} hover:bg-transparent `}>
                  <div className="flex gap-4">
                    <div className=" relative">

                      <Link href="/wishlist"> <CiHeart /></Link>
                      {isAuthenticated && !!wishNumber && <span className="absolute -top-2 left-3 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">{wishNumber}</span>}
                    </div>
                    <div className=" relative">

                      <Link href="/cart"><FaShoppingCart /></Link>
                  
                      {isAuthenticated && !!cartNumber && <span className="absolute -top-2 left-3 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">{cartNumber}</span>}
                    </div>
                    <FaRegIdCard />
                    {isAuthenticated ? <> <button className="bg-main-color p-1.5 rounded-md" onClick={HandelLogOut}>logout</button> </> : <Link className="bg-main-color p-2 rounded-md" href="/Login">login</Link>}

                  </div>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList></> : <NavigationMenuList className="flex gap-5 justify-center">
            <NavigationMenuItem className="hidden lg:flex">
              <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} hover:bg-transparent hover:text-green-600`}>
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} hover:bg-transparent hover:text-green-600`}>
              <div className="flex gap-2">
                <FaHeadset className="hidden lg:block" />
                <div className=" hidden lg:flex flex-col">
                  <span>Support
                  </span>
                  <span>
                    24/7 Help
                  </span>
                </div>

              </div>
            </NavigationMenuLink>

            <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} hover:bg-transparent `}>
              <div className="flex gap-4">

                <CiHeart />
                <div className=" relative">
                  <FaShoppingCart />
                  {/* <span className="absolute -top-1 left-3 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">0</span> */}
                </div>
                <FaRegIdCard />

              </div>
            </NavigationMenuLink>
            <Link className="bg-main-color p-2 rounded-md" href="/Login">login</Link>
          </NavigationMenuList>}

        </NavigationMenu>
      </nav>



    </>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
