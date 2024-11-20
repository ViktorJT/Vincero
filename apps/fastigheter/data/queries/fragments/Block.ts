export const BlockFragment = `
  fragment Block on Block {
    __typename
    id
    
    title
    heading
    body

    links(first: 2) {
      ...Link
    }

    asset {
      ...Asset
    }
  }
`;
