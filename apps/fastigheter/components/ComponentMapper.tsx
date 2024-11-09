import dynamic from "next/dynamic";

import type { ComponentType } from "react";

import type { BannerProps } from "@vincero/ui/banner";
import type { CarouselProps } from "@vincero/ui/carousel";
import type { FormProps } from "@vincero/ui/form";
import type { HeaderProps } from "@vincero/ui/header";
import type { MediaProps } from "@vincero/ui/media";
import type { OverviewProps } from "@vincero/ui/overview";
import type { SliderProps } from "@vincero/ui/slider";
import type { TextProps } from "@vincero/ui/text";

const Components = {
  //Banner: dynamic(() => import("@vincero/ui/banner").then((mod) => mod.Banner)),
  //Carousel: dynamic(() =>
  //  import("@vincero/ui/carousel").then((mod) => mod.Carousel),
  //),
  //Form: dynamic(() => import("@vincero/ui/form").then((mod) => mod.Form)),
  Header: dynamic(() => import("@vincero/ui/header").then((mod) => mod.Header)),
  //Media: dynamic(() => import("@vincero/ui/media").then((mod) => mod.Media)),
  //Overview: dynamic(() =>
  //  import("@vincero/ui/overview").then((mod) => mod.Overview),
  //),
  //Slider: dynamic(() => import("@vincero/ui/slider").then((mod) => mod.Slider)),
  //Text: dynamic(() => import("@vincero/ui/text").then((mod) => mod.Text)),
};

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
  modules: ModuleProps[];
}

export async function ComponentMapper({ modules }: ComponentMapperProps) {
  return (
    <>
      {modules.map(({ __typename, id, ...props }, i: number) => {
        const Component = Components[__typename];

        if (!Component) {
          console.warn(`No component found for type: ${__typename}`);
          return null;
        }

        return <Component key={`${id}-${i}`} id={id} {...props} />;
      })}
    </>
  );
}
