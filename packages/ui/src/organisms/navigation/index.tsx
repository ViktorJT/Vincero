"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Menu, X } from "lucide-react";

import {
  Link,
  usePathname,
  useRouter,
} from "@vincero/languages-config/navigation";

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

import type { ReactNode } from "react";
import type { LinkProps, NavItemProps, Props } from "./index.types";

function ToggleButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  const icon =
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200";

  return (
    <button
      aria-expanded={isOpen}
      aria-label="Toggle menu"
      className="relative z-20 h-8 w-8 text-white hover:text-muted focus:outline-none"
      onClick={onClick}
    >
      <Menu
        className={cn(icon, isOpen ? "opacity-0 scale-75" : "opacity-100")}
        size={32}
      />
      <X
        className={cn(icon, isOpen ? "opacity-100" : "opacity-0 scale-75")}
        size={32}
      />
    </button>
  );
}

function NavLink({
  link,
  className,
  onClick,
  children,
}: {
  link: LinkProps;
  className?: string;
  onClick: () => void;
  children: ReactNode;
}) {
  const { href } = prioritiseHref(link);
  const classes = cn(
    "w-full text-dark hover:text-muted transition-colors",
    className,
  );

  return link.external ? (
    <a
      className={classes}
      href={href}
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {children}
    </a>
  ) : (
    <Link className={classes} href={href} onClick={onClick}>
      {children}
    </Link>
  );
}

function NavItem({
  item,
  onClose,
}: {
  item: NavItemProps;
  onClose: () => void;
}) {
  const { menuLink, subMenuLinks } = item;

  if (!subMenuLinks?.length) {
    return (
      <NavLink
        className="block py-3 text-heading"
        link={menuLink}
        onClick={onClose}
      >
        {menuLink.displayText}
      </NavLink>
    );
  }

  return (
    <AccordionItem className="border-b-0" value={item.id}>
      <AccordionTrigger className="py-3 text-heading font-light hover:text-muted hover:no-underline">
        {menuLink.displayText}
      </AccordionTrigger>
      <AccordionContent className="pl-6 md:pl-10 py-1 flex flex-col">
        <NavLink className="text-body py-2" link={menuLink} onClick={onClose}>
          {menuLink.displayText}
        </NavLink>
        {/* Sub-links are anchors on the parent page */}
        {subMenuLinks.map((subLink) => (
          <NavLink
            key={subLink.id}
            className="text-body py-2"
            link={{ ...menuLink, anchor: subLink.anchor }}
            onClick={onClose}
          >
            {subLink.displayText}
          </NavLink>
        ))}
        <div className="h-4" />
      </AccordionContent>
    </AccordionItem>
  );
}

function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const option = (value: string) =>
    cn(
      "transition-colors hover:text-muted hover:opacity-100",
      locale === value ? "opacity-100" : "opacity-50",
    );

  return (
    <button
      className="mt-10 md:mt-20 text-heading-small flex gap-2"
      // Same page in the other language; next-intl handles the /en prefix
      onClick={() =>
        router.replace(pathname, { locale: locale === "en" ? "sv" : "en" })
      }
    >
      <span className={option("sv")}>SV</span>/
      <span className={option("en")}>EN</span>
    </button>
  );
}

export function Navigation({ className, id, logo, links }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const isHome = usePathname() === "/";
  const close = () => setIsOpen(false);

  useScrollLock(isOpen);

  useEffect(() => {
    // Small threshold so overscroll bounce at the top (iOS) doesn't toggle
    // the background back and forth
    const handleScroll = () => setHasScrolled(window.scrollY > 16);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  return (
    <nav
      className={cn("fixed z-50 top-0 w-full text-light", className)}
      id={id}
    >
      <div
        className={cn(
          "grid grid-cols-[1fr_auto_1fr] items-center px-6 md:px-20 transition-colors duration-200",
          hasScrolled ? "bg-dark" : isHome ? "bg-dark/0" : "bg-dark/40",
        )}
      >
        <Link
          aria-label="Till hemsida"
          className="relative col-start-2 h-[72px] w-[172px]"
          href="/"
        >
          <Media
            asset={logo}
            className="inset-0 h-full w-full object-contain"
          />
        </Link>
        <div className="flex justify-end">
          <ToggleButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </div>
      </div>

      {/* Clicking outside the menu closes it */}
      {isOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 -z-10"
          onClick={close}
        />
      )}

      <div
        className={cn(
          "fixed top-0 right-0 h-screen max-w-[800px] w-5/6 md:w-1/3 md:min-w-[400px] bg-dark text-white",
          "transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="h-full flex mt-[5.5rem] px-6 md:pr-20 md:pl-10">
          <div className="w-full">
            <Accordion collapsible type="single">
              {links.map((item) => (
                <NavItem key={item.id} item={item} onClose={close} />
              ))}
            </Accordion>
            <LanguageToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
