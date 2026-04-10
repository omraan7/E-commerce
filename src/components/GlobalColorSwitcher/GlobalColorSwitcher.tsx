// "use client";
// import { useState, useEffect } from "react";

// const themes = [
//   { label: "Green",  main: "#16A34A", min: "#A7F3D0", tw: "bg-green-500"  },
//   { label: "Blue",   main: "#3B82F6", min: "#93C5FD", tw: "bg-blue-500"   },
//   { label: "Red",    main: "#EF4444", min: "#FCA5A5", tw: "bg-red-500"    },
//   { label: "Purple", main: "#9333EA", min: "#D8B4FE", tw: "bg-purple-500" },
//   { label: "Orange", main: "#F97316", min: "#FED7AA", tw: "bg-orange-500" },
//   { label: "Pink",   main: "#EC4899", min: "#FBCFE8", tw: "bg-pink-500"   },
//   { label: "Teal",   main: "#0D9488", min: "#99F6E4", tw: "bg-teal-500"   },
//   { label: "Indigo", main: "#6366F1", min: "#C7D2FE", tw: "bg-indigo-500" },
// ]

// export default function GlobalColorSwitcher() {
//   const [activeMain, setActiveMain] = useState(() => {
//     if (typeof window === "undefined") return "#16A34A";
//     return localStorage.getItem("mainColor") ?? "#16A34A";
//   });

//   useEffect(() => {
//     const savedMain = localStorage.getItem("mainColor");
//     const savedMin  = localStorage.getItem("minColor");
//     if (savedMain) document.documentElement.style.setProperty("--color-main-color", savedMain);
//     if (savedMin)  document.documentElement.style.setProperty("--color-min-color",  savedMin);
//   }, []);

//   function applyTheme(main: string, min: string) {
//     setActiveMain(main);
//     document.documentElement.style.setProperty("--color-main-color", main);
//     document.documentElement.style.setProperty("--color-min-color", min);
//     localStorage.setItem("mainColor", main);
//     localStorage.setItem("minColor", min);
//   }

//   return (
//     <div className="flex gap-2 items-center flex-wrap">
//       {themes.map(({ label, main, min, tw }) => (
//         <button
//           key={main}
//           title={label}
//           onClick={() => applyTheme(main, min)}
//           className={`w-4 h-4 rounded-full ${tw} transition-transform duration-150
//            `}
//         />
//       ))}
//     </div>
//   );
// }

"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Palette } from "lucide-react";

const themes = [
  { label: "Green",  main: "#16A34A", min: "#A7F3D0", tw: "bg-green-500"  },
  { label: "Blue",   main: "#3B82F6", min: "#93C5FD", tw: "bg-blue-500"   },
  { label: "Red",    main: "#EF4444", min: "#FCA5A5", tw: "bg-red-500"    },
  { label: "Purple", main: "#9333EA", min: "#D8B4FE", tw: "bg-purple-500" },
  { label: "Orange", main: "#F97316", min: "#FED7AA", tw: "bg-orange-500" },
  { label: "Pink",   main: "#EC4899", min: "#FBCFE8", tw: "bg-pink-500"   },
  { label: "Teal",   main: "#0D9488", min: "#99F6E4", tw: "bg-teal-500"   },
  { label: "Indigo", main: "#6366F1", min: "#C7D2FE", tw: "bg-indigo-500" },
]

export default function GlobalColorSwitcher() {
  const [activeMain, setActiveMain] = useState("#16A34A");
  const [open, setOpen]             = useState(false);
  const [mounted, setMounted]       = useState(false);
  const ref = useRef<HTMLDivElement>(null);

 
  useEffect(() => {
    const savedMain = localStorage.getItem("mainColor");
    const savedMin  = localStorage.getItem("minColor");
    if (savedMain) {
      setActiveMain(savedMain);
      document.documentElement.style.setProperty("--color-main-color", savedMain);
    }
    if (savedMin) {
      document.documentElement.style.setProperty("--color-min-color", savedMin);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

   
  if (!mounted) return null;

  function applyTheme(main: string, min: string) {
    setActiveMain(main);
    document.documentElement.style.setProperty("--color-main-color", main);
    document.documentElement.style.setProperty("--color-min-color", min);
    localStorage.setItem("mainColor", main);
    localStorage.setItem("minColor", min);
    setOpen(false);
  }

  const activeTheme = themes.find(t => t.main === activeMain) ?? themes[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200
                   hover:border-gray-300 hover:bg-gray-50 transition-all duration-150 group"
      >
        <Palette size={13} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
        <span className={`w-4 h-4 rounded-full ${activeTheme.tw} ring-1 ring-offset-1 ring-gray-300`} />
        <ChevronDown
          size={12}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full -left-30  mt-2 p-3 bg-white rounded-xl 
                        border border-gray-100 z-9999 w-max">
          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-2.5">
            Theme Color
          </p>
          <div className="flex gap-2">
            {themes.map(({ label, main, min, tw }) => (
              <button
                key={main}
                title={label}
                onClick={() => applyTheme(main, min)}
                className={`w-6 h-6 rounded-full ${tw} transition-all duration-150
                  ${activeMain === main
                    ? "ring-2 ring-offset-2 ring-gray-400 scale-110"
                    : "hover:scale-110 opacity-70 hover:opacity-100"
                  }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}