"use client";
import { useState, useEffect } from "react";

export default function GlobalColorSwitcher() {
  // 🔹 Initial state من localStorage مباشرة
  const [mainColor, setMainColor] = useState(() => {
    const saved = localStorage.getItem("mainColor");
    if (saved) {
      // نطبق اللون فورًا على الـ root
      document.documentElement.style.setProperty("--color-main-color", saved);
      return saved;
    }
    return "#16A34A";
  });

  const [minColor, setMinColor] = useState(() => {
    const saved = localStorage.getItem("minColor");
    if (saved) {
      document.documentElement.style.setProperty("--color-min-color", saved);
      return saved;
    }
    return "#A7F3D0";
  });

  // 🔹 Update CSS variables & localStorage عند أي تغيير
  useEffect(() => {
    document.documentElement.style.setProperty("--color-main-color", mainColor);
    document.documentElement.style.setProperty("--color-min-color", minColor);
    localStorage.setItem("mainColor", mainColor);
    localStorage.setItem("minColor", minColor);
  }, [mainColor, minColor]);

  return (
    <div className="flex gap-4 items-center justify-center my-5">
      <button
        onClick={() => {
          setMainColor("#EF4444"); // Red
          setMinColor("#FCA5A5");  // Light Red
        }}
        className="px-4 py-2 bg-red-500 text-white rounded-lg"
      >
        Red
      </button>

      <button
        onClick={() => {
          setMainColor("#3B82F6"); // Blue
          setMinColor("#93C5FD");   // Light Blue
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Blue
      </button>

      <button
        onClick={() => {
          setMainColor("#16A34A"); // Green
          setMinColor("#A7F3D0");  // Light Green
        }}
        className="px-4 py-2 bg-green-500 text-white rounded-lg"
      >
        Green
      </button>
    </div>
  );
}