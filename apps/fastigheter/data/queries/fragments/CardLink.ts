export const CardLinkFragment = `
  fragment CardLink on CardLink {
    __typename
    id

    external
    externalUrl

    page {
      __typename
      id

      slug
      parentPage {
        slug
      }
    }
  }
`;
