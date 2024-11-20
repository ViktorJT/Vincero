import { AssetFragment } from "../fragments/Asset";

export const GalleryQuery = `
  ${AssetFragment}

  query GetGalleryByID($id: ID!) {
    gallery(where: { id: $id }) {
      __typename
      id

      assets {
        ...Asset
      }
    }
  }
`;
