export const LockupFragment = `
  fragment Lockup on Lockup {
    __typename
    id

    title

    paragraphs {
      ...RichText
    }
  }
`;
