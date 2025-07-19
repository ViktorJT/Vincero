export const BlockFragment = `
  fragment Block on Block {
    __typename
    id
    
    text {
      ...RichText
    }

    title {
      ...RichText
    }

    links(first: 2) {
      ...Link
    }

    asset {
      ...Asset
    }
  }
`;
