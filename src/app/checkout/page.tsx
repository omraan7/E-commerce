import Link from "next/link";
import CheckoutForm from "./CheckoutForm";
import { getCartDataAll } from "../cart/cart.services";
import { CartResponse } from "../cart/cartInterface";

export default async function CheckoutPage() {
  const datacart: CartResponse | null = await getCartDataAll();

  if (!datacart) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Failed to load cart. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <nav className="text-sm text-gray-500 flex items-center gap-1">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-gray-700">Cart</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Checkout</span>
        </nav>
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 pb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Complete Your Order</h1>
          </div>
          <p className="text-sm text-gray-500 mt-1 ml-12">Review your items and complete your purchase</p>
        </div>
        <a href="#" className="flex items-center gap-1 text-green-600 text-sm font-medium hover:underline">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Cart
        </a>
      </div>

      {/* Main Grid */}
      <CheckoutForm datacart={datacart} />

      {/* Footer Bar */}
      <div className="bg-white border-t border-gray-100 py-6">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              ),
              title: "Free Shipping",
              sub: "On orders over 500 EGP",
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              ),
              title: "Easy Returns",
              sub: "14-day return policy",
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              ),
              title: "Secure Payment",
              sub: "100% secure checkout",
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              ),
              title: "24/7 Support",
              sub: "Contact us anytime",
            },
          ].map((feat, i) => (
            <div key={i} className="flex items-center gap-3">
              <svg className="w-7 h-7 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {feat.icon}
              </svg>
              <div>
                <p className="text-xs font-semibold text-gray-800">{feat.title}</p>
                <p className="text-xs text-gray-500">{feat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}