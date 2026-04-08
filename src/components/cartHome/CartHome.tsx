import PromoBannersClient from "./Promo";

 
const banners = [
  {
    badge: { icon: "🔥", text: "Deal of the Day" },
    title: "Fresh Organic Fruits",
    description: "Get up to 40% off on selected organic fruits",
    discount: "40% OFF",
    code: "ORGANIC40",
    cta: "Shop Now",
    gradient: "linear-gradient(135deg, #2d9e4e 0%, #1a7a35 60%, #145c28 100%)",
    ctaStyle: { background: "#fff", color: "#1a7a35", border: "none" },
    direction: "left",
  },
  {
    badge: { icon: "⚡", text: "New Arrivals" },
    title: "Exotic Vegetables",
    description: "Discover our latest collection of premium vegetables",
    discount: "25% OFF",
    code: "FRESH25",
    cta: "Explore Now",
    gradient: "linear-gradient(135deg, #ff8c00 0%, #ff5e3a 60%, #ff3b6e 100%)",
    ctaStyle: { background: "#fff", color: "#ff5e3a", border: "none" },
    direction: "right",
  },
];

export default function PromoBanners() {
  return (
    <section style={{ padding: "40px 20px" }}>
      <PromoBannersClient banners={banners} />
    </section>
  );
}