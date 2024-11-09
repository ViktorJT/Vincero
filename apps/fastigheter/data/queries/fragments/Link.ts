export const LinkFragment = `
  fragment Link on Link {
    __typename
    id

    anchor
    variant
    external
    ariaLabel
    externalUrl
    displayText
    description
    relAttribute
    titleAttribute
    advancedSettings

    page {
      id
      title
    }
  }
`;
