"use client";

import {
  Root,
  List,
  Item,
  Trigger,
  Content,
  Viewport,
} from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { forwardRef, useState, memo } from "react";
import type { ElementRef, ComponentPropsWithoutRef } from "react";

import type { LinkProps, Props } from "./index.types";

import { cn } from "../../lib/utils/cn";
import { prioritiseHref } from "../../lib/utils/prioritiseHref";

// Styles
const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-link transition-colors hover:bg-light/10 hover:text-white data-[active]:bg-light/10 data-[active]:text-white data-[state=open]:bg-light/10 data-[state=open]:text-white",
);

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <Link
          ref={ref}
          className={cn(
            "block cursor-pointer select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors dark:hover:bg-dark/20 hover:bg-light/10 hover:text-white dark:hover:text-dark focus:bg-accent focus:text-light dark:focus:text-dark",
            className,
          )}
          {...props}
        >
          <div>{title}</div>
          <p className="line-clamp-2 text-detail">{children}</p>
        </Link>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";

// NavigationMenuTrigger remains unchanged
const NavigationMenuTrigger = memo(
  ({
    className,
    children,
  }: {
    className?: string;
    children: React.ReactNode;
  }) => (
    <Trigger className={cn(navigationMenuTriggerStyle(), "group", className)}>
      {children}{" "}
      <ChevronDown
        aria-hidden="true"
        className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
      />
    </Trigger>
  ),
);
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

// Main Navigation Component
export function Navigation({ className, id, leftColumn, rightColumn }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const allLinks = [...leftColumn, ...rightColumn];

  const NavigationLink = memo(function NavigationLink({
    link,
    onClick,
  }: {
    link: LinkProps;
    onClick?: () => void;
  }) {
    const { href, external, displayText, ariaLabel } = prioritiseHref(link);

    if (external) {
      return (
        <a
          aria-label={ariaLabel}
          className={navigationMenuTriggerStyle()}
          href={href}
          rel={link.relAttribute || "noopener noreferrer"}
          title={link.titleAttribute}
          onClick={onClick}
        >
          {displayText}
        </a>
      );
    }

    return (
      <Link
        aria-label={ariaLabel}
        className={navigationMenuTriggerStyle()}
        href={href}
        onClick={onClick}
      >
        {displayText}
      </Link>
    );
  });

  const DropdownContent = ({ parentLink }: { parentLink: LinkProps }) => {
    const { href } = prioritiseHref(parentLink);
    return (
      <Content className="left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto shadow-sm">
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-light/10 dark:bg-light text-light dark:text-dark">
          <ListItem href={href} title={parentLink.displayText}>
            {parentLink.description}
          </ListItem>
          {parentLink.subLinks?.map((subLink: LinkProps) => {
            const { href } = prioritiseHref(subLink);
            return (
              <ListItem
                key={subLink.id}
                href={href}
                title={subLink.displayText}
              >
                {subLink.description}
              </ListItem>
            );
          })}
        </ul>
      </Content>
    );
  };

  return (
    <Root
      className={cn(
        "fixed z-20 top-0 w-full text-light dark:text-dark",
        className,
      )}
      id={id}
    >
      <div className="relative mx-auto">
        {/* Mobile Menu Button - Only visible on mobile */}
        <div className="bg-dark/20 backdrop-blur flex w-full items-center justify-between p-4 md:hidden">
          <div className="w-8" />
          <div className="text-2xl font-bold">LOGO</div>
          <button
            aria-label="Toggle menu"
            className="text-light dark:text-dark focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="relative hidden px-6 h-16 w-full items-center justify-between md:flex">
          {/* Left list */}
          <List className="flex items-center space-x-6">
            {leftColumn.map((link) => (
              <Item key={link.id}>
                {link.subLinks?.length ? (
                  <>
                    <NavigationMenuTrigger>
                      {link.displayText}
                    </NavigationMenuTrigger>
                    <DropdownContent parentLink={link} />
                  </>
                ) : (
                  <NavigationLink link={link} />
                )}
              </Item>
            ))}
          </List>

          {/* Center logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold whitespace-nowrap">
            LOGO
          </div>

          {/* Right list */}
          <List className="flex items-center space-x-6">
            {rightColumn.map((link) => (
              <Item key={link.id}>
                {link.subLinks?.length ? (
                  <>
                    <NavigationMenuTrigger>
                      {link.displayText}
                    </NavigationMenuTrigger>
                    <DropdownContent parentLink={link} />
                  </>
                ) : (
                  <NavigationLink link={link} />
                )}
              </Item>
            ))}
          </List>
        </div>

        {/* Mobile Menu - Only visible on mobile when open */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 right-0 top-full md:hidden">
            <nav className="flex flex-col space-y-2 p-4 bg-dark/20 backdrop-blur shadow-lg">
              {allLinks.map((link) => (
                <NavigationLink
                  key={link.id}
                  link={link}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              ))}
            </nav>
          </div>
        )}

        <Viewport
          className={cn(
            "origin-top-center absolute left-0 top-full mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md bg-dark dark:bg-light text-light dark:text-dark shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
          )}
        />
      </div>
    </Root>
  );
}
