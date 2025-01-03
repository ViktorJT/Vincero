"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import Link from "next/link";

import { defaultLocale } from "@vincero/languages-config";

import type { Locale } from "@vincero/languages-config";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../atoms/accordion";

import { Media } from "../media";
import { Button } from "../../atoms/button";

import type {
  ToggleProps,
  LinkProps,
  Props,
  BackdropProps,
  SlideMenuProps,
} from "./index.types";

import { useScrollLock } from "../../lib/hooks/useScrollLock";

import { prioritiseHref } from "../../lib/utils/prioritiseHref";
import { cn } from "../../lib/utils/cn";

const Backdrop = ({ show, onClose }: BackdropProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <div
      aria-hidden="true"
      className={cn(
        "fixed z-20 inset-0 transition-opacity duration-200",
        show ? " " : "pointer-events-none",
      )}
      onClick={onClose}
    />,
    document.body,
  );
};

const ToggleButton = ({ isOpen, onClick, className }: ToggleProps) => (
  <button
    aria-label="Toggle menu"
    className={cn(
      isOpen ? "text-dark" : "text-white",
      "focus:outline-none z-20 w-8 h-8 relative",
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
    "text-heading-large w-full text-dark hover:text-black transition-colors";

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

const SlideMenu = ({ isOpen, navItems, onClose }: SlideMenuProps) => {
  const topLinkStyles = "py-3 text-heading";

  return (
    <div
      className={cn(
        "fixed top-0 right-0 h-screen max-w-[800px] w-5/6 md:w-1/3 bg-accent text-dark",
        "transform transition-transform duration-200 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <div
        key={isOpen ? "open" : "closed"}
        className="h-full flex mt-[5.5rem] px-6 md:pr-20 md:pl-10"
      >
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
                      className={cn(topLinkStyles, "hover:no-underline")}
                    >
                      {navItem.menuLink.displayText}
                    </AccordionTrigger>
                    <AccordionContent className="pl-4 py-1 flex flex-col">
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
          </Accordion>
        </nav>
      </div>
    </div>
  );
};

function LanguageToggle({ className }: { className: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = (pathname.split("/")[1] as Locale) || defaultLocale;

  const switchLanguage = (newLocale: Locale) => {
    // Remove current locale from path if it exists
    let newPath = pathname.replace(/^\/[a-z]{2}/, "");

    // If path is empty after removing locale, make it '/'
    if (!newPath) newPath = "/";

    // Add new locale to path unless it's the default locale
    const finalPath =
      newLocale === defaultLocale ? newPath : `/${newLocale}${newPath}`;

    // Set cookie for middleware
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

    // Navigate to new path
    router.push(finalPath);
  };

  return (
    <Button
      arrow={false}
      className={cn(
        "border-white text-white hover:bg-white hover:text-dark",
        className,
      )}
      size="sm"
      variant="outline"
      onClick={() => switchLanguage(currentLocale === "sv" ? "en" : "sv")}
    >
      <span
        className={cn(
          currentLocale === "sv" ? "opacity-100" : "hidden md:block opacity-50",
        )}
      >
        sv
      </span>
      <span className="hidden md:block">/</span>
      <span
        className={cn(
          currentLocale === "en" ? "opacity-100" : "hidden md:block opacity-50",
        )}
      >
        en
      </span>
    </Button>
  );
}

export function Navigation({
  className,
  id,
  logo,
  leftColumn,
  rightColumn,
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const allNavItems = [...leftColumn, ...rightColumn];

  useScrollLock(isMenuOpen);

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
    <header
      className={cn("fixed z-50 top-0 w-full text-light", className)}
      id={id}
    >
      <div
        className={cn(
          "h-[5.5rem] flex items-center px-6 md:px-20 relative transition-colors duration-200",
          hasScrolled ? "bg-dark" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex-1 flex items-center">
          <div className="flex-1 basis-24">
            <div className="gap-4 flex">
              <LanguageToggle className="visible md:invisible" />
              <ToggleButton
                className="invisible pointer-events-none"
                isOpen={isMenuOpen}
                onClick={() => {}}
              />
            </div>
          </div>
          <div className="flex-1 basis-full flex justify-center">
            <Link
              aria-label="Till hemsida"
              className="block hover:text-white transition-colors"
              href="/"
            >
              <Media asset={logo} className="h-[80px] object-contain" />
            </Link>
          </div>
          <div className="flex-1 items-center gap-4 basis-24 flex justify-end">
            <LanguageToggle className="hidden md:flex" />
            <ToggleButton
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>
      </div>

      <Backdrop show={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SlideMenu
        isOpen={isMenuOpen}
        navItems={allNavItems}
        onClose={() => setIsMenuOpen(false)}
      />
    </header>
  );
}
