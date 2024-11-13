export const MediaQuery = `
  query GetMediaByID($id: ID!) {
    media(where: { id: $id }) {
      __typename
      id

      variant

      media
    }
  }
`;
