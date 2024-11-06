import dynamic from "next/dynamic";

import type { Props, ProfileProps, PageLinkProps } from "./index.types";

// Dynamically import components based on the variant
// @todos consolidate these into one card component
const Profile = dynamic(() =>
  import("../../atoms/profile").then((mod) => mod.Profile),
);
const PageLink = dynamic(() =>
  import("../../atoms/pagelink").then((mod) => mod.PageLink),
);

export function Carousel({ title, subtitle, items, variant = "team" }: Props) {
  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground text-lg">{subtitle}</p>
          )}
        </div>

        <div className="lg:block relative">
          <div className="flex gap-6">
            {items.map((item) =>
              variant === "team" ? (
                <Profile key={item.id} {...(item as ProfileProps)} />
              ) : (
                <PageLink key={item.id} {...(item as PageLinkProps)} />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
