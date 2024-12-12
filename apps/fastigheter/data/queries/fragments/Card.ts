export const CardFragment = `
  fragment Card on Card {
    __typename
    id

    fill

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
