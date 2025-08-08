import { RichTextFragment } from "../fragments/RichText";
import { AssetFragment } from "../fragments/Asset";

export const ImageCarouselQuery = `
  ${RichTextFragment}  
  ${AssetFragment}  

  query GetCarouselByID($id: ID!, $locale: Locale!) {
    imageCarousel(where: { id: $id }, locales: [$locale, en]) {
      __typename
      id

      title {
        ...RichText
      }
      subtitle {
        ...RichText
      }

      images(first: 20) {
        ...Asset
      }
    }
  }
`;
