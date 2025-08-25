"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function HashScroll({ maxWaitMs = 5000 }: { maxWaitMs?: number }) {
  const pathname = usePathname();

  useEffect(() => {
    const hash =
      typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (!hash) return;

    const start = performance.now();
    let raf = 0;

    const tryScroll = () => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (performance.now() - start < maxWaitMs) {
        raf = requestAnimationFrame(tryScroll);
      }
    };

    raf = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(raf);
  }, [pathname, maxWaitMs]);

  return null;
}
