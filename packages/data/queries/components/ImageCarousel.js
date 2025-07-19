import { AssetFragment } from "../fragments/Asset";

export const ImageCarouselQuery = `
  ${AssetFragment}  

  query GetCarouselByID($id: ID!, $locale: Locale!) {
    imageCarousel(where: { id: $id }, locales: [$locale, en]) {
      __typename
      id

      title
      subtitle

      images(first: 20) {
        ...Asset
      }
    }
  }
`;
