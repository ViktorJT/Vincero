import { NavItemFragment } from "../fragments/NavItem";
import { SubLinkFragment } from "../fragments/SubLink";
import { LinkFragment } from "../fragments/Link";

export const navigationQuery = `
  ${SubLinkFragment}
  ${NavItemFragment}
  ${LinkFragment}

  query GetNavigation($locale: Locale!) {
    navigations(first: 1, locales: [$locale, en]) {
      __typename
      id

      title
      links(first: 10) {
        ...NavItem
      }
    }
  }
`;
