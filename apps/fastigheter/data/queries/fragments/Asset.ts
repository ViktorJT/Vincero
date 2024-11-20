export const AssetFragment = `
  fragment Asset on Asset {
    __typename
    id

    alt
    mimeType
    url
    width
    height

    optimised
  }
`;
