// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prioritiseHref = (link: any) => {
  if (!link) {
    throw new Error("Invalid link passed to prioritiseHref");
  }

  const { external, externalUrl, page, anchor } = link;

  // Handle external URLs as before
  if (external && externalUrl) {
    return {
      ...link,
      href: externalUrl,
    };
  }

  // For internal links, ensure absolute paths
  const pathParts = [page?.parentPage?.slug, page?.slug, anchor].filter(
    Boolean,
  );

  // Always prefix with / for absolute path
  const href = pathParts.length > 0 ? `/${pathParts.join("/")}` : "/";

  return {
    ...link,
    href,
  };
};
