import { AssetFragment } from "@/data/queries/fragments/Asset";

export const MediaQuery = `
  ${AssetFragment}

  query GetMediaByID($id: ID!) {
    media(where: { id: $id }) {
      __typename
      id

      variant

      assets(first: 10) {
        ..Asset
      }
    }
  }
`;
