import { useEffect } from "react";

// The scrollbar gutter is kept stable in global CSS (`scrollbar-gutter`), so
// hiding overflow does not shift the layout and needs no padding compensation.
export const useScrollLock = (lock: boolean) => {
  useEffect(() => {
    document.body.style.overflow = lock ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [lock]);
};
