export const CardFragment = `
  fragment Card on Card {
    __typename
    id

    fill

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
