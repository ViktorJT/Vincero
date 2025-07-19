export const NavItemFragment = `
  fragment NavItem on NavItem {
    __typename
    id
    
    menuLink {
      ...Link
    }

    subMenuLinks(first: 6) {
      ...SubLink
    }
  }
`;
