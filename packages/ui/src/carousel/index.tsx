import { ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

import { Button } from "../atoms/button";
import { Pagination } from "../atoms/pagination";

import type { Props, ProfileProps, PageLinkProps } from "./index.types";

const ITEMS_PER_PAGE = 4;

// Dynamically import components based on the variant
const Profile = dynamic(() =>
  import("../atoms/profile").then((mod) => mod.Profile),
);
const PageLink = dynamic(() =>
  import("../atoms/pagelink").then((mod) => mod.PageLink),
);

export function Carousel({ title, subtitle, items, variant = "team" }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const totalSlides = Math.ceil(items.length / ITEMS_PER_PAGE);
  const displayedItems = isExpanded ? items : items.slice(0, ITEMS_PER_PAGE);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground text-lg">{subtitle}</p>
          )}
        </div>

        {/* Desktop View */}
        <div
          className="hidden lg:block relative"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <div className="flex gap-6">
            {displayedItems.map((item) =>
              variant === "team" ? (
                <Profile key={item.id} {...(item as ProfileProps)} />
              ) : (
                <PageLink key={item.id} {...(item as PageLinkProps)} />
              ),
            )}
          </div>

          {showControls && items.length > ITEMS_PER_PAGE && (
            <>
              <Button
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16"
                size="icon"
                variant="primary"
                onClick={handlePrevSlide}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16"
                size="icon"
                variant="secondary"
                onClick={handleNextSlide}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        {/* Mobile View */}
        <div className="lg:hidden space-y-6">
          {displayedItems.map((item) =>
            variant === "team" ? (
              <Profile
                key={item.id}
                {...(item as ProfileProps)}
                className="mx-auto"
              />
            ) : (
              <PageLink
                key={item.id}
                {...(item as PageLinkProps)}
                className="mx-auto"
              />
            ),
          )}

          {items.length > ITEMS_PER_PAGE && (
            <Button
              className="w-full mt-4"
              variant="primary"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "See Less" : "See More"}
            </Button>
          )}

          <Pagination
            className="mt-6"
            currentPage={currentSlide}
            totalPages={totalSlides}
            onPageChange={setCurrentSlide}
          />
        </div>
      </div>
    </div>
  );
}
