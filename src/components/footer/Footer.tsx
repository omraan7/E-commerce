import {
  Truck, RotateCcw, ShieldCheck, Headphones,
  ShoppingCart, Phone, Mail, MapPin,
  Facebook, Twitter, Instagram, Youtube,
  CreditCard,
} from "lucide-react";

const features = [
  { icon: Truck,        title: "Free Shipping",   desc: "On orders over 500 EGP" },
  { icon: RotateCcw,    title: "Easy Returns",    desc: "14-day return policy" },
  { icon: ShieldCheck,  title: "Secure Payment",  desc: "100% secure checkout" },
  { icon: Headphones,   title: "24/7 Support",    desc: "Contact us anytime" },
];
import Link from "next/link";

const footerLinks = {
  Shop: [
    { label: "All Products",    href: "/products" },
    { label: "Categories",      href: "/Categories" },
    { label: "Brands",          href: "/brand" },
    { label: "Electronics",     href: "/electronics" },
    { label: "Men's Fashion",   href: "/mens-fashion" },
    { label: "Women's Fashion", href: "/womens-fashion" },
  ],
  Account: [
    { label: "My Account",      href: "/account" },
    { label: "Order History",   href: "/account/orders" },
    { label: "Wishlist",        href: "/wishlist" },
    { label: "Shopping Cart",   href: "/cart" },
    { label: "Sign In",         href: "/auth/signin" },
    { label: "Create Account",  href: "/auth/signup" },
  ],
  Support: [
    { label: "Contact Us",       href: "/contact" },
    { label: "Help Center",      href: "/help" },
    { label: "Shipping Info",    href: "/shipping" },
    { label: "Returns & Refunds",href: "/returns" },
    { label: "Track Order",      href: "/track" },
  ],
  Legal: [
    { label: "Privacy Policy",   href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy",    href: "/cookies" },
  ],
};

const socials = [
  { icon: Facebook },
  { icon: Twitter },
  { icon: Instagram },
  { icon: Youtube },
];

const payments = ["Visa", "Mastercard", "PayPal"];

export default function Footer() {
  return (
    <footer>
      {/* ── Features Bar ── */}
      <div className="bg-main-color/20 px-10 py-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-3">
            <div className=" text-sm md:tex-md w-9 h-9 md:w-11 md:h-11 bg-main-color/5 rounded-xl flex items-center justify-center shrink-0">
              <Icon size={22} className="text-main-color/90" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{title}</p>
              <p className="text-xs text-gray-600">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer Main ── */}
      <div className="bg-gray-900 px-10 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[280px_repeat(4,1fr)] gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 w-fit mb-5">
              <ShoppingCart size={22} className="text-main-color" />
              <span className="text-xl font-extrabold text-gray-900">FreshCart</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              FreshCart is your one-stop destination for quality products. From fashion to
              electronics, we bring you the best brands at competitive prices with a seamless
              shopping experience.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Phone size={16} className="text-main-color" /> +1 (800) 123-4567
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Mail size={16} className="text-main-color" /> support@freshcart.com
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin size={16} className="text-main-color" /> 123 Commerce Street, New York, NY 10001
              </li>
            </ul>
            <div className="flex gap-2">
              {socials.map(({ icon: Icon }, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:bg-main-color hover:text-white hover:border-main-color transition-colors"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Nav Cols */}
       {Object.entries(footerLinks).map(([title, links]) => (
  <div key={title}>
    <h3 className="text-white font-bold text-sm mb-4">{title}</h3>
    <ul className="space-y-2.5">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-gray-400 text-sm hover:text-main-color transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
))}
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 FreshCart. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {payments.map((p) => (
              <div key={p} className="flex items-center gap-1.5 text-xs text-gray-400">
                <CreditCard size={16} className="text-gray-500" />
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}