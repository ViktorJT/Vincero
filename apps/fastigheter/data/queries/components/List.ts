import { LinkFragment } from "../fragments/Link";

export const ListQuery = `
  ${LinkFragment}

  query ($id: ID!) {
    list(where: { id: $id }) {
      __typename
      id

      items(first: 50) {
        id

        title
        body

        link {
          ...Link
        }
      }
    }
  }
`;
