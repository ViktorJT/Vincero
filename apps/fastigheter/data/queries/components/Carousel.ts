import { AssetFragment } from "../fragments/Asset";

export const CarouselQuery = `
  ${AssetFragment}

  query GetCarouselByID($id: ID!) {
    carousel(where: { id: $id }) {
      __typename
      id

      title
      subtitle
      variant

      pages(first: 15) {
        id
        title
        description
        image {
          ...Asset
        }
      }

      profiles(first: 15) {
        id
        name
        role
        email
        image {
          ...Asset
        }
      }    
    }
  }
`;
