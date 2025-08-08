export const CardFragment = `
  fragment Card on Card {
    __typename
    id

    asset {
      ...Asset
    }

    link {
      ...Link
    }

    text {
      ...RichText
    }
  }
`;
