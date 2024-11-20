// @todos any type

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prioritiseHref = (link: any) => {
  if (!link) {
    throw new Error("Invalid link passed to prioritiseHref");
  }

  const { external, externalUrl, page, anchor } = link;

  const href =
    external && externalUrl
      ? externalUrl
      : [page?.parentPage?.slug, page?.slug, anchor].filter(Boolean).join("/");

  return {
    ...link,
    href,
  };
};
