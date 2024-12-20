import { AssetFragment } from "../fragments/Asset";

export const MediaQuery = `
  ${AssetFragment}

  query GetMediaByID($id: ID!) {
    media(where: { id: $id }) {
      __typename
      id

      asset {
        ...Asset
      }
    }
  }
`;
