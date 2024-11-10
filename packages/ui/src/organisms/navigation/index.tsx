"use client";

import {
  Root,
  List,
  Link,
  Item,
  Trigger,
  Content,
  Viewport,
  Indicator,
} from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { Menu, X, ChevronDown } from "lucide-react";
//import NextLink from "next/link"; // @todos
import { forwardRef, useState } from "react";

import type { ElementRef, ComponentPropsWithoutRef } from "react";

import type { ColumnProps, Props } from "./index.types";

import { cn } from "../../lib/utils/cn";
import { prioritiseHref } from "../../lib/utils/prioritiseHref";

const NavigationMenu = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, children, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn(
      "relative z-10 flex flex-1 items-center justify-between",
      className,
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </Root>
));
NavigationMenu.displayName = Root.displayName;

const NavigationMenuList = forwardRef<
  ElementRef<typeof List>,
  ComponentPropsWithoutRef<typeof List>
>(({ className, ...props }, ref) => (
  <List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className,
    )}
    {...props}
  />
));
NavigationMenuList.displayName = List.displayName;

const NavigationMenuItem = Item;

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-link font-medium transition-colors hover:bg-accent hover:text-black focus:bg-accent focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
);

const NavigationMenuTrigger = forwardRef<
  ElementRef<typeof Trigger>,
  ComponentPropsWithoutRef<typeof Trigger>
>(({ className, children, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      aria-hidden="true"
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
    />
  </Trigger>
));
NavigationMenuTrigger.displayName = Trigger.displayName;

const NavigationMenuContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref) => (
  <Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = Content.displayName;

const NavigationMenuLink = Link;

const NavigationMenuViewport = forwardRef<
  ElementRef<typeof Viewport>,
  ComponentPropsWithoutRef<typeof Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <Viewport
      ref={ref}
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className,
      )}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = Viewport.displayName;

const NavigationMenuIndicator = forwardRef<
  ElementRef<typeof Indicator>,
  ComponentPropsWithoutRef<typeof Indicator>
>(({ className, ...props }, ref) => (
  <Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className,
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </Indicator>
));
NavigationMenuIndicator.displayName = Indicator.displayName;

function Column({ links }: ColumnProps) {
  return (
    <NavigationMenuList>
      {links.map((link) => {
        const parentLink = prioritiseHref(link);

        return parentLink.subLinks?.length ? (
          <NavigationMenuItem key={parentLink.id}>
            <NavigationMenuTrigger>
              {parentLink.displayText}
            </NavigationMenuTrigger>

            {parentLink.subLinks && (
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  <ListItem
                    href={parentLink.href}
                    title={parentLink.displayText}
                  >
                    {parentLink.description}
                  </ListItem>

                  {parentLink.subLinks?.map((subLink) => {
                    const { id, displayText, description, href } =
                      prioritiseHref(subLink);

                    return (
                      <ListItem key={id} href={href} title={displayText}>
                        {description}
                      </ListItem>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            )}
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem key={parentLink.id}>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <p
                className="cursor-pointer"
                //href={parentLink.href}
              >
                {parentLink.displayText}
              </p>
            </NavigationMenuLink>
          </NavigationMenuItem>
        );
      })}
    </NavigationMenuList>
  );
}

export function Navigation({ id, leftColumn, rightColumn, className }: Props) {
  return (
    <NavigationMenu
      className={cn("fixed top-0 w-full text-light", className)}
      id={id}
    >
      <Column links={leftColumn} />
      <p>LOGO</p>
      <Column links={rightColumn} />
    </NavigationMenu>
  );
}

export function MobileNavigation({
  id,
  rightColumn,
  leftColumn,
  className,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const links = [...leftColumn, ...rightColumn];

  return (
    <NavigationMenu className={cn("relative z-10 w-full", className)} id={id}>
      <div className="flex items-center justify-between p-4">
        <div className="w-8" /> {/* Spacer for balance */}
        <div className="text-2xl font-bold">LOGO</div>
        <button
          aria-label="Toggle menu"
          className="text-foreground focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <NavigationMenuList className="absolute left-0 right-0 top-full flex flex-col bg-background shadow-lg">
          {links.map((link) => (
            <NavigationMenuItem key={link.id}>
              <NavigationMenuLink asChild>
                <p
                  className={navigationMenuTriggerStyle()}
                  //href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  {link.displayText}
                </p>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      )}
    </NavigationMenu>
  );
}

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";
