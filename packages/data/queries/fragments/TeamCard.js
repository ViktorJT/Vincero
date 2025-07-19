export const TeamCardFragment = `
  fragment TeamCard on TeamCard {
    __typename
    id

    asset {
      ...Asset
    }

    text {
      ...RichText
    }

    email
  }
`;
