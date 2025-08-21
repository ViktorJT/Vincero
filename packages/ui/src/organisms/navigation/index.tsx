"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

import { defaultLocale } from "@vincero/languages-config";

import type {
  ToggleProps,
  LinkProps,
  Props,
  SlideMenuProps,
} from "./index.types";
import type { Locale } from "@vincero/languages-config";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../atoms/accordion";
import { Media } from "../media";

import { useScrollLock } from "../../lib/hooks/useScrollLock";
import { prioritiseHref } from "../../lib/utils/prioritiseHref";
import { cn } from "../../lib/utils/cn";

const ToggleButton = ({ isOpen, onClick, className }: ToggleProps) => (
  <button
    aria-label="Toggle menu"
    className={cn(
      isOpen && "hover:text-muted",
      "text-white focus:outline-none z-20 w-8 h-8 relative",
      className,
    )}
    onClick={onClick}
  >
    <Menu
      className={cn(
        "transition-all duration-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        isOpen ? "opacity-0 scale-75" : "opacity-100 scale-100",
      )}
      size={32}
    />
    <X
      className={cn(
        "transition-all duration-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-75",
      )}
      size={32}
    />
  </button>
);

const NavLink = ({
  onClick,
  children,
  ariaLabel,
  relAttribute = "noopener noreferrer",
  titleAttribute,
  className,
  ...props
}: LinkProps & { className?: string }) => {
  const { external, href } = prioritiseHref(props);
  const baseClassName =
    "text-heading-large w-full text-dark hover:text-muted transition-colors";

  if (external) {
    return (
      <a
        aria-label={ariaLabel}
        className={cn(baseClassName, className)}
        href={href}
        rel={relAttribute}
        title={titleAttribute}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      aria-label={ariaLabel}
      className={cn(baseClassName, className)}
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const SlideMenu = ({ isOpen = false, navItems, onClose }: SlideMenuProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const topLinkStyles = "py-3 text-heading";

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Skip if click is inside the menu
      if (ref.current?.contains(target)) return;

      // Skip if click is on the toggle button
      if (target.closest(".slide-toggle-button")) return;

      onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={ref}
      className={cn(
        "fixed top-0 right-0 h-screen max-w-[800px] w-5/6 md:w-1/3 md:min-w-[400px] bg-dark text-white",
        "transform transition-transform duration-200 ease-in-out translate-x-full",
        isOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <div className="h-full flex mt-[5.5rem] px-6 md:pr-20 md:pl-10">
        <nav className="w-full">
          <Accordion collapsible type="single">
            {navItems.map((navItem) => {
              if (navItem.subMenuLinks?.length) {
                return (
                  <AccordionItem
                    key={navItem.id}
                    className="border-b-0"
                    value={navItem.id}
                  >
                    <AccordionTrigger
                      className={cn(
                        topLinkStyles,
                        "font-light hover:text-muted hover:no-underline",
                      )}
                    >
                      {navItem.menuLink.displayText}
                    </AccordionTrigger>
                    <AccordionContent className="pl-6 md:pl-10 py-1 flex flex-col">
                      <>
                        <NavLink
                          key={navItem.id}
                          className="text-body py-2"
                          onClick={onClose}
                          {...navItem.menuLink}
                        >
                          {navItem.menuLink.displayText}
                        </NavLink>

                        {navItem.subMenuLinks.map((subLink) => (
                          <NavLink
                            key={subLink.id}
                            onClick={onClose}
                            {...navItem.menuLink}
                            {...subLink}
                            className="text-body py-2"
                          >
                            {subLink.displayText}
                          </NavLink>
                        ))}
                        <div className="h-4" />
                      </>
                    </AccordionContent>
                  </AccordionItem>
                );
              }

              return (
                <NavLink
                  key={navItem.id}
                  className={cn(topLinkStyles, "block")}
                  onClick={onClose}
                  {...navItem.menuLink}
                >
                  {navItem.menuLink.displayText}
                </NavLink>
              );
            })}
            <LanguageToggle />
          </Accordion>
        </nav>
      </div>
    </div>
  );
};

function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();

  // Determine current locale from pathname
  const currentLocale: Locale = pathname.startsWith("/en") ? "en" : "sv";

  const handleLanguageChange = () => {
    const targetLocale: Locale = currentLocale === "en" ? "sv" : "en";

    // Get the path without the locale prefix
    const pathWithoutLocale = pathname.replace(/^\/en\/?/, "/");

    // Construct the new path based on target locale
    const newPath =
      targetLocale === defaultLocale
        ? pathWithoutLocale
        : `/${targetLocale}${pathWithoutLocale}`;

    // Update cookie via the API before navigation
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/`;

    // Navigate to new path
    router.push(newPath);
  };

  return (
    <button
      className="mt-10 md:mt-20 text-heading-small flex gap-2"
      onClick={handleLanguageChange}
    >
      <span
        className={cn(
          "transition-colors hover:text-muted hover:opacity-100",
          currentLocale === "sv" ? "opacity-100" : "opacity-50",
        )}
      >
        SV
      </span>
      /
      <span
        className={cn(
          "transition-colors hover:text-muted hover:opacity-100",
          currentLocale === "en" ? "opacity-100" : "opacity-50",
        )}
      >
        EN
      </span>
    </button>
  );
}

export function Navigation({ className, id, logo, links }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useScrollLock(isMenuOpen);

  const isHome = usePathname() === "/";

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "overflow-hidden fixed z-50 top-0 w-full text-light",
        className,
      )}
      id={id}
    >
      <div
        className={cn(
          "flex items-center px-6 md:px-20 relative transition-colors duration-200",
          hasScrolled ? "bg-dark" : isHome ? "bg-dark/0" : "bg-dark/40",
        )}
      >
        <div className="mx-auto flex-1 flex items-center">
          <div className="flex-1 basis-24 gap-4 flex">
            <ToggleButton
              className="slide-toggle-button invisible pointer-events-none"
              isOpen={false}
              onClick={() => {}}
            />
          </div>
          <div className="flex-1 basis-full flex justify-center">
            <Link
              aria-label="Till hemsida"
              className="relative h-[72px] w-[172px]"
              href="/"
            >
              <Media
                asset={logo}
                className="inset-0 h-full w-full object-contain"
              />
            </Link>
          </div>
          <div className="flex-1 items-center gap-4 basis-24 flex justify-end">
            <ToggleButton
              className="slide-toggle-button"
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>
      </div>

      <SlideMenu
        isOpen={isMenuOpen}
        navItems={links}
        onClose={() => setIsMenuOpen(false)}
      />
    </nav>
  );
}
