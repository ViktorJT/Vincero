import { useState, useEffect } from "react";

type Breakpoint = "base" | "md" | "xl";

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("base");

  useEffect(() => {
    const updateBreakpoint = () => {
      if (window.matchMedia("(min-width: 1280px)").matches) {
        setBreakpoint("xl");
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        setBreakpoint("md");
      } else {
        setBreakpoint("base");
      }
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return breakpoint;
}
