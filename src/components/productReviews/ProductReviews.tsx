"use client";

import { useState } from "react";
import {
  LayoutGrid, Star, Truck,
  RotateCcw, ShieldCheck, Check, PenLine,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Review {
  _id: string;
  rating: number;
  review: string;
  user: { name: string };
  createdAt: string;
}

interface ProductDetails {
  sold: number;
  ratingsQuantity: number;
  ratingsAverage: number;
  title: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  category: { name: string };
  subcategory: { name: string }[];
  brand: { name: string };
  reviews: Review[];
}

// ─── Tab Config ───────────────────────────────────────────────────────────────
const TABS = ["Product Details", "Reviews", "Shipping & Returns"] as const;
type Tab = (typeof TABS)[number];

const TAB_ICONS: Record<Tab, React.ElementType> = {
  "Product Details": LayoutGrid,
  "Reviews": Star,
  "Shipping & Returns": Truck,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const StarRating = ({ rating, size = 16 }: { rating: number; size?: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} size={size}
        fill={i <= rating ? "#f59e0b" : "#e5e7eb"}
        stroke={i <= rating ? "#f59e0b" : "#e5e7eb"}
      />
    ))}
  </div>
);

const RATING_BREAKDOWNS = [5, 4, 3, 2, 1];

const SHIPPING_SECTIONS = [
  {
    title: "Shipping Information",
    Icon: Truck,
    items: [
      "Free shipping on orders over $50",
      "Standard delivery: 3-5 business days",
      "Express delivery available (1-2 business days)",
      "Track your order in real-time",
    ],
  },
  {
    title: "Returns & Refunds",
    Icon: RotateCcw,
    items: [
      "30-day hassle-free returns",
      "Full refund or exchange available",
      "Free return shipping on defective items",
      "Easy online return process",
    ],
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ProductTabs({ product }: { product: ProductDetails }) {
  const [activeTab, setActiveTab] = useState<Tab>("Product Details");

  const infoRows = [
    { label: "Category",    value: product.category.name },
    { label: "Subcategory", value: product.subcategory[0]?.name },
    { label: "Brand",       value: product.brand.name },
    { label: "Items Sold",  value: `${product.sold}+ sold` },
  ];

  const features = [
    "Premium Quality Product",
    "100% Authentic Guarantee",
    "Fast & Secure Packaging",
    "Quality Tested",
  ];

  // Calculate per-star percentage from reviews
  const ratingCounts = RATING_BREAKDOWNS.map((star) => ({
    star,
    pct: product.reviews.length
      ? Math.round((product.reviews.filter((r) => Math.round(r.rating) === star).length / product.reviews.length) * 100)
      : 0,
  }));

  /* 
   {
    _id: '69cd339b460be8e0dbc86298',
    review: 'nice product',
    rating: 4,
    product: '6408e98e6406cd15828e8f30',
    user: { _id: '69cd336a460be8e0dbc86265', name: 'menna' },
    createdAt: '2026-04-01T15:02:51.711Z',
    updatedAt: '2026-04-01T15:03:04.994Z'
  }
  
  */
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden w-full ">

      {/* ── Tab Header ── */}
      <div className="flex border-b border-gray-200 px-4">
        {TABS.map((tab) => {
          const Icon = TAB_ICONS[tab];
          const isActive = activeTab === tab;
          return (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-4 text-sm font-medium border-b-2 -mb-px transition-all duration-200 whitespace-nowrap cursor-pointer ${
                isActive
                  ? "text-main-color border-main-color font-semibold"
                  : "text-gray-400 border-transparent hover:text-main-color hover:border-main-color"
              }`}
            >
              <Icon size={15}
                fill={isActive && tab === "Reviews" ? "#0000" : "none"}
                stroke="currentColor"
              />
              {tab === "Reviews" ? `Reviews (${product.ratingsQuantity})` : tab}
            </button>
          );
        })}
      </div>

      {/* ── Product Details ── */}
      {activeTab === "Product Details" && (
        <div className="p-6">
          <h3 className="text-base font-bold text-gray-900 mb-2">About this Product</h3>
          <p className="text-sm text-gray-500 mb-6 whitespace-pre-line">{product.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Info table */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <p className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-4">Product Information</p>
              {infoRows.map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-0 text-sm">
                  <span className="text-gray-400">{label}</span>
                  <span className="font-semibold text-gray-900">{value}</span>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <p className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-4">Key Features</p>
              <ul>
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3 py-2.5 border-b border-gray-200 last:border-0 text-sm text-gray-700">
                    <div className="w-5 h-5 bg-min-color/50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={11} strokeWidth={3} className="text-[#000000]" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ── Reviews ── */}
      {activeTab === "Reviews" && (
        <div className="p-6">
          {/* Summary */}
          <div className="flex items-center gap-8 mb-6 pb-6 border-b border-gray-200">
            <div className="flex flex-col items-center gap-1 min-w-25">
              <span className="text-5xl font-black text-gray-900 leading-none">{product.ratingsAverage}</span>
              <StarRating rating={product.ratingsAverage} size={18} />
              <p className="text-xs text-gray-400 mt-1 text-center">Based on {product.ratingsQuantity} reviews</p>
            </div>
            <div className="flex-1 space-y-2">
              {ratingCounts.map(({ star, pct }) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-8 text-right leading-tight">
                    {star}<br /><span className="text-[10px]">star</span>
                  </span>
                  <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: "#e5e7eb" }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, backgroundColor: "#f59e0b" }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-8">{pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Review cards or empty */}
          {product.reviews.length > 0 ? (
            <div className="space-y-3">
              {product.reviews.map((r) => (
                <div key={r._id} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{r.user?.name ?? "Customer"}</p>
                      <StarRating rating={r.rating} size={13} />
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(r.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mt-2">{r.review}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-8">
              <Star size={40} fill="#d1d5db" stroke="#d1d5db" />
              <p className="text-sm text-gray-400">Customer reviews will be displayed here.</p>
              <button className="text-sm font-semibold text-main-color hover:underline flex items-center gap-1.5">
                <PenLine size={14} /> Write a Review
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Shipping & Returns ── */}
      {activeTab === "Shipping & Returns" && (
        <div className="p-6 space-y-4">
          {/* Two cards side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SHIPPING_SECTIONS.map(({ title, Icon, items }) => (
              <div key={title} className="bg-min-color/15 border border-min-color rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-main-color rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-white" />
                  </div>
                  <p className="text-sm font-bold text-gray-900">{title}</p>
                </div>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                      <Check size={14} strokeWidth={3} className="text-[#2d7a4f] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Buyer Protection */}
          <div className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={18} className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 mb-0.5">Buyer Protection Guarantee</p>
              <p className="text-sm text-gray-500">
                Get a full refund if your order does not arrive or is not as described. We ensure your shopping experience is safe and secure.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}