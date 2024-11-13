export const HeaderQuery = `
  query GetHeaderByID($id: ID!) {
    header(where: { id: $id }) {
      __typename
      id

      title
      subtitle

      background
    }
  }
`;
