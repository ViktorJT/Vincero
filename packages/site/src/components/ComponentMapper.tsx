import { Banner } from "@vincero/ui/banner";
import { List } from "@vincero/ui/list";
import { ImageCarousel } from "@vincero/ui/imageCarousel";
import { Form } from "@vincero/ui/form";
import { Header } from "@vincero/ui/header";
import { Media } from "@vincero/ui/media";
import { Overview } from "@vincero/ui/overview";
import { Slider } from "@vincero/ui/slider";
import { Text } from "@vincero/ui/text";

import type { ComponentType } from "react";

import type { BannerProps } from "@vincero/ui/banner";
import type { ListProps } from "@vincero/ui/list";
import type { ImageCarouselProps } from "@vincero/ui/imageCarousel";
import type { FormProps } from "@vincero/ui/form";
import type { HeaderProps } from "@vincero/ui/header";
import type { MediaProps } from "@vincero/ui/media";
import type { OverviewProps } from "@vincero/ui/overview";
import type { SliderProps } from "@vincero/ui/slider";
import type { TextProps } from "@vincero/ui/text";

type ComponentTypes = {
  Banner: ComponentType<BannerProps>;
  List: ComponentType<ListProps>;
  ImageCarousel: ComponentType<ImageCarouselProps>;
  Form: ComponentType<FormProps>;
  Header: ComponentType<HeaderProps>;
  Media: ComponentType<MediaProps>;
  Overview: ComponentType<OverviewProps>;
  Slider: ComponentType<SliderProps>;
  Text: ComponentType<TextProps>;
};

interface ModuleProps {
  __typename: keyof ComponentTypes;
  id: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface ComponentMapperProps {
  components: ModuleProps[];
}

const Components = {
  Banner,
  List,
  ImageCarousel,
  Form,
  Header,
  Media,
  Overview,
  Slider,
  Text,
} as const;

export async function ComponentMapper({ components }: ComponentMapperProps) {
  return (
    <div className={components[0].__typename !== "Header" ? "pt-20" : ""}>
      {components.map(({ __typename, ...props }, i: number) => {
        const Component = Components[__typename];

        if (!Component) {
          console.warn(`No component found for type: ${__typename}`);
          return null;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <Component key={`${props.id}-${i}`} {...(props as any)} />;
      })}
    </div>
  );
}
