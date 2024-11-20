export const LinkFragment = `
  fragment Link on Link {
    __typename
    id

    external
    externalUrl
    displayText
    description

    page {
      __typename
      id

      slug
    }
  }
`;
