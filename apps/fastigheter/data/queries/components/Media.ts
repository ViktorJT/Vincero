import { AssetFragment } from "@/data/queries/fragments/Asset";

export const MediaQuery = `
  ${AssetFragment}

  query GetMediaByID($id: ID!) {
    media(where: { id: $id }) {
      __typename
      id

      variant

      media(first: 10) {
        ...Asset
      }
    }
  }
`;
