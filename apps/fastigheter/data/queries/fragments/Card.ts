export const CardFragment = `
  fragment Card on Card {
    __typename
    id

    asset {
      ...Asset
    }

    link {
      ...CardLink
    }

    text {
      ...RichText
    }
  }
`;
