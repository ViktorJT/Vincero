export const UnitCardFragment = `
  fragment UnitCard on UnitCard {
    __typename
    id

    asset {
      ...Asset
    }

    title
    subtitle

    information {
      ...Value
    }

    link {
      ...Link
    }
  }
`;
