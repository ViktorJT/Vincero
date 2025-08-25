"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash =
      typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (!hash) return;

    let raf = 0;
    let tries = 0;

    const tryScroll = () => {
      console.log("Trying to scroll to", hash);
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (tries++ < 60) {
        raf = requestAnimationFrame(tryScroll); // up to ~1s
      }
    };

    raf = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
