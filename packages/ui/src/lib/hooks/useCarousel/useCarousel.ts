import { createContext, useContext } from "react";

import type { CarouselContextProps } from "../../../organisms/carousel/index.types";

export const CarouselContext = createContext<CarouselContextProps | null>(null);

export function useCarousel() {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}
