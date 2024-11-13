"use client";

import {
  Root,
  List,
  Item,
  Trigger,
  Content,
  Viewport,
} from "@radix-ui/react-navigation-menu";
import { Menu, X, ChevronDown } from "lucide-react";
import { forwardRef, useState, useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils/cn";

import type { ElementRef, ComponentPropsWithoutRef } from "react";
import type { LinkProps, Props } from "./index.types";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Base styles for navigation items
const baseNavStyles =
  "inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-link transition-colors hover:bg-light/10 hover:text-white";
const activeNavStyles =
  "data-[active]:bg-light/10 data-[active]:text-white data-[state=open]:bg-light/10 data-[state=open]:text-light";

// Utility hook for managing scroll lock
const useScrollLock = (lock: boolean) => {
  useEffect(() => {
    if (lock) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [lock]);
};

const Backdrop = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isMounted) return null;

  return createPortal(
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 bg-black/50 transition-opacity duration-200 md:hidden",
        show ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
      onClick={handleClick}
    />,
    document.body,
  );
};

const Logo = () => (
  <Link
    aria-label="Till hemsida"
    className="text-2xl font-bold whitespace-nowrap hover:text-white/90 transition-colors cursor-pointer"
    href="/"
  >
    LOGO
  </Link>
);

const NavLink = ({
  href,
  external,
  onClick,
  children,
  ariaLabel,
  relAttribute = "noopener noreferrer",
  titleAttribute,
}: {
  href: string;
  external?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
  relAttribute?: string;
  titleAttribute?: string;
}) => {
  const className = cn(baseNavStyles, activeNavStyles);

  if (external) {
    return (
      <a
        aria-label={ariaLabel}
        className={className}
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
      className={className}
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const DropdownItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, href }, ref) => (
    <li>
      <Link
        ref={ref}
        className={cn(
          "block cursor-pointer select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-light/10 hover:text-white focus:text-light",
          className,
        )}
        href={href as string}
      >
        <div>{title}</div>
        <p className="line-clamp-2 text-detail">{children}</p>
      </Link>
    </li>
  ),
);
DropdownItem.displayName = "DropdownItem";

const NavTrigger = ({ children }: { children: React.ReactNode }) => (
  <Trigger className={cn(baseNavStyles, activeNavStyles, "group")}>
    {children}
    <ChevronDown
      aria-hidden="true"
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
    />
  </Trigger>
);

const DropdownMenu = ({ link }: { link: LinkProps }) => (
  <Content
    className="absolute left-0 top-0 w-full 
      data-[motion=from-start]:animate-enterFromLeft
      data-[motion=from-end]:animate-enterFromRight
      data-[motion=to-start]:animate-exitToLeft
      data-[motion=to-end]:animate-exitToRight
      md:absolute md:w-auto shadow-sm"
  >
    <ul className="grid w-[400px] gap-2 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-light/10 text-light animate-scaleIn">
      <DropdownItem href={link.href || ""} title={link.displayText}>
        {link.description}
      </DropdownItem>
      {link.subLinks?.map((subLink) => (
        <DropdownItem
          key={subLink.id}
          href={subLink.href || ""}
          title={subLink.displayText}
        >
          {subLink.description}
        </DropdownItem>
      ))}
    </ul>
  </Content>
);

const MobileMenu = ({
  isOpen,
  links,
  onClose,
}: {
  isOpen: boolean;
  links: LinkProps[];
  onClose: () => void;
}) => (
  <>
    <Backdrop show={isOpen} onClose={onClose} />
    <div
      className={cn(
        "absolute left-0 right-0 top-full md:hidden",
        "transition-all duration-200 ease-in-out transform origin-top",
        "z-50", // Ensure menu is above backdrop
        isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none",
      )}
    >
      <nav className="flex flex-col space-y-4 p-4 pb-10 bg-dark shadow-lg">
        {links.map((link) => (
          <NavLink
            key={link.id}
            ariaLabel={link.ariaLabel}
            external={link.external}
            href={link.href || ""}
            onClick={onClose}
          >
            {link.displayText}
          </NavLink>
        ))}
      </nav>
    </div>
  </>
);

// Main Navigation Component
export function Navigation({ className, id, leftColumn, rightColumn }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Apply scroll lock when mobile menu is open
  useScrollLock(isMobileMenuOpen);

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });
    tl.to(navRef.current, {
      yPercent: -100,
      duration: 0.3,
      ease: "power2.inOut",
    });

    ScrollTrigger.create({
      trigger: document.documentElement,
      start: "100px top",
      onUpdate: (self) => {
        self.direction === 1 ? tl.play() : tl.reverse();
      },
      toggleActions: "play none none reverse",
    });

    return () => tl.kill();
  }, [pathname]);

  return (
    <Root
      ref={navRef}
      className={cn(
        "fixed z-20 top-0 w-full text-light will-change-transform",
        className,
      )}
      id={id}
    >
      <div className="relative mx-auto">
        {/* Mobile Header */}
        <div className="bg-dark flex w-full items-center justify-between p-4 md:hidden">
          <div className="w-8" />
          <Logo />
          <button
            aria-label="Toggle menu"
            className="text-light focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="relative hidden px-6 h-16 w-full bg-dark items-center justify-between md:flex">
          <List className="flex items-center space-x-6">
            {leftColumn.map((link) => (
              <Item key={link.id}>
                {link.subLinks?.length ? (
                  <>
                    <NavTrigger>{link.displayText}</NavTrigger>
                    <DropdownMenu link={link} />
                  </>
                ) : (
                  <NavLink
                    ariaLabel={link.ariaLabel}
                    external={link.external}
                    href={link.href || ""}
                  >
                    {link.displayText}
                  </NavLink>
                )}
              </Item>
            ))}
          </List>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Logo />
          </div>

          <List className="flex items-center space-x-6">
            {rightColumn.map((link) => (
              <Item key={link.id}>
                {link.subLinks?.length ? (
                  <>
                    <NavTrigger>{link.displayText}</NavTrigger>
                    <DropdownMenu link={link} />
                  </>
                ) : (
                  <NavLink
                    ariaLabel={link.ariaLabel}
                    external={link.external}
                    href={link.href || ""}
                  >
                    {link.displayText}
                  </NavLink>
                )}
              </Item>
            ))}
          </List>
        </div>

        <MobileMenu
          isOpen={isMobileMenuOpen}
          links={[...leftColumn, ...rightColumn]}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        <Viewport
          className={cn(
            "origin-top-center absolute left-6 top-full h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md bg-dark text-light shadow-lg",
            "data-[state=open]:animate-scaleIn",
            "data-[state=closed]:animate-scaleOut",
            "md:w-[var(--radix-navigation-menu-viewport-width)]",
          )}
        />
      </div>
    </Root>
  );
}
