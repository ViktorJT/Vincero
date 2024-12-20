import Link from "next/link";

import { prioritiseHref } from "../../lib/utils/prioritiseHref";

import type { FC } from "react";
import type { ListItem, ListProps } from "./index.types";

const ListItemCard: FC<ListItem> = ({ title, body, link }) => {
  const { href } = prioritiseHref(link);
  return (
    <Link
      className="text-dark dark:text-light block p-6 border-b border-gray-100 transition-colors duration-200"
      href={href}
    >
      <h2 className="text-heading-small mb-2 line-clamp-1">{title}</h2>
      <p className="text-body line-clamp-3">{body}</p>
    </Link>
  );
};

// Main List component
const List: FC<ListProps> = ({ items }) => (
  <div className="py-14 bg-white dark:bg-dark divide-y divide-dark dark:divide-light">
    {items.map((item) => (
      <ListItemCard key={item.id} {...item} />
    ))}
  </div>
);

export { List, type ListProps };
