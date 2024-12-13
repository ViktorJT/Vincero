"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import Link from "next/link";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../atoms/accordion";

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

import { Media } from "../media";

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
        "fixed z-20 inset-0 bg-dark transition-opacity duration-200",
        show ? "opacity-30" : "opacity-0 pointer-events-none",
      )}
      onClick={onClose}
    />,
    document.body,
  );
};

const ToggleButton = ({ isOpen, onClick }: ToggleProps) => (
  <button
    aria-label="Toggle menu"
    className={cn(
      isOpen ? "text-dark" : "text-white",
      "focus:outline-none z-20 w-8 h-8 relative",
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
      <div className="h-full flex mt-[5.5rem] px-6 md:pr-20 md:pl-10">
        <nav className="w-full">
          {navItems.map((navItem) => {
            if (navItem.subMenuLinks?.length) {
              return (
                <Accordion key={navItem.id} collapsible type="single">
                  <AccordionItem className="border-b-0" value={navItem.id}>
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
                </Accordion>
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
        </nav>
      </div>
    </div>
  );
};

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
            <div className="invisible">
              <ToggleButton isOpen={isMenuOpen} onClick={() => {}} />
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
          <div className="flex-1 basis-24 flex justify-end">
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
