"use client";

import { useEffect, useRef, useState } from "react";

interface Banner {
  direction: "left" | "right";
  gradient: string;
  badge: {
    icon: string;
    text: string;
  };
  title: string;
  description: string;
  discount: string;
  code: string;
  cta: string;
  ctaStyle: React.CSSProperties;
}

function BannerCard({ banner, index }: { banner: Banner; index: number }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const translateX = banner.direction === "left" ? "-20px" : "20px";

  return (
    <div
      ref={ref}
      style={{
        background: banner.gradient,
        borderRadius: "20px",
        padding: "36px 32px",
        position: "relative",
        overflow: "hidden",
        flex: "1",
        minWidth: "280px",
        transform: visible ? "translateX(0)" : `translateX(${translateX})`,
        opacity: visible ? 1 : 0,
        transition: `transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s, opacity 0.7s ease ${index * 0.1}s`,
        willChange: "transform, opacity",
      }}
    >
      <div
        style={{
          position: "absolute", top: "-40px", right: "-40px",
          width: "180px", height: "180px", borderRadius: "50%",
          background: "rgba(255,255,255,0.08)", pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute", bottom: "-60px", right: "60px",
          width: "140px", height: "140px", borderRadius: "50%",
          background: "rgba(255,255,255,0.08)", pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          background: "rgba(255,255,255,0.22)", borderRadius: "999px",
          padding: "5px 14px", marginBottom: "20px",
        }}
      >
        <span style={{ fontSize: "14px" }}>{banner.badge.icon}</span>
        <span style={{ color: "#fff", fontSize: "13px", fontWeight: "500" }}>
          {banner.badge.text}
        </span>
      </div>

      <h2
        style={{
          color: "#fff", fontSize: "clamp(22px, 3vw, 32px)",
          fontWeight: "700", margin: "0 0 10px", lineHeight: "1.2",
          letterSpacing: "-0.3px",
        }}
      >
        {banner.title}
      </h2>

      <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", margin: "0 0 20px" }}>
        {banner.description}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px", flexWrap: "wrap" }}>
        <span style={{ color: "#fff", fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: "800", letterSpacing: "-0.5px" }}>
          {banner.discount}
        </span>
        <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px" }}>
          Use code: <strong style={{ fontWeight: "700", letterSpacing: "0.5px" }}>{banner.code}</strong>
        </span>
      </div>

      <button
        style={{
          ...banner.ctaStyle,
          borderRadius: "999px", padding: "13px 28px",
          fontSize: "15px", fontWeight: "600", cursor: "pointer",
          display: "inline-flex", alignItems: "center", gap: "8px",
          transition: "transform 0.2s ease",
          position: "relative", zIndex: 1,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {banner.cta} <span>→</span>
      </button>
    </div>
  );
}

export default function PromoBannersClient({ banners }: { banners: Banner[] }) {
  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {banners.map((banner, i) => (
        <BannerCard key={i} banner={banner} index={i} />
      ))}
    </div>
  );
}