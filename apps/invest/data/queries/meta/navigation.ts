import { NavItemFragment } from "../fragments/NavItem";
import { SubLinkFragment } from "../fragments/SubLink";
import { LinkFragment } from "../fragments/Link";

export const navigationQuery = `
  ${SubLinkFragment}
  ${NavItemFragment}
  ${LinkFragment}

  query GetNavigation {
    navigations(first: 1) {
      __typename
      id

      leftColumn(first: 5) {
        ...NavItem
      }

      rightColumn(first: 5) {
        ...NavItem
      }
    }
  }
`;
