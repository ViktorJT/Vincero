import type { UseEmblaCarouselType } from "embla-carousel-react";
import type useEmblaCarousel from "embla-carousel-react";

import type { Props as CardProps } from "../../molecules/card/index.types";

type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

export type CarouselApi = UseEmblaCarouselType[1];

export type ContainerProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

export type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & ContainerProps;

export type CarouselProps = {
  id: string;
  title: string;
  items: CardProps[];
  mediaClass?: string;
  subtitle?: string;
};
