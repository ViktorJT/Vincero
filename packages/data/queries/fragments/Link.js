export const LinkFragment = `
  fragment Link on Link {
    __typename
    id

    external
    externalUrl
    displayText

    page {
      __typename
      id

      slug

      parentPage {
        __typename
        id
        
        slug
      }
    }
  }
`;
