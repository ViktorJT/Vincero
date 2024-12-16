import { Banner } from "@vincero/ui/banner";
import { Carousel } from "@vincero/ui/carousel";
import { Form } from "@vincero/ui/form";
import { Header } from "@vincero/ui/header";
import { Media } from "@vincero/ui/media";
import { Overview } from "@vincero/ui/overview";
import { Slider } from "@vincero/ui/slider";
import { Text } from "@vincero/ui/text";

import type { ComponentType } from "react";

import type { BannerProps } from "@vincero/ui/banner";
import type { CarouselProps } from "@vincero/ui/carousel";
import type { FormProps } from "@vincero/ui/form";
import type { HeaderProps } from "@vincero/ui/header";
import type { MediaProps } from "@vincero/ui/media";
import type { OverviewProps } from "@vincero/ui/overview";
import type { SliderProps } from "@vincero/ui/slider";
import type { TextProps } from "@vincero/ui/text";

type ComponentTypes = {
  Banner: ComponentType<BannerProps>;
  Carousel: ComponentType<CarouselProps>;
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
  [key: string]: any; // For additional props passed from CMS
  // @todos replace all of this with graphql-codegen later?
}

interface ComponentMapperProps {
  components: ModuleProps[];
}

const Components = {
  Banner,
  Carousel,
  Form,
  Header,
  Media,
  Overview,
  Slider,
  Text,
} as const;

export async function ComponentMapper(data: ComponentMapperProps) {
  return (
    <>
      {data.components.map(({ __typename, ...props }, i: number) => {
        const Component = Components[__typename];

        if (!Component) {
          console.warn(`No component found for type: ${__typename}`);
          return null;
        }

        // @todos type here isn't good
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <Component key={`${props.id}-${i}`} {...(props as any)} />;
      })}
    </>
  );
}
