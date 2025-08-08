import { RichTextFragment } from "../fragments/RichText";
import { AssetFragment } from "../fragments/Asset";
import { CardFragment } from "../fragments/Card";
import { LinkFragment } from "../fragments/Link";

export const CarouselQuery = `
  ${RichTextFragment}  
  ${AssetFragment}  
  ${CardFragment}  
  ${LinkFragment}  

  query GetCarouselByID($id: ID!, $locale: Locale!) {
    carousel(where: { id: $id }, locales: [$locale, en]) {
      __typename
      id

      title {
        ...RichText
      }
      subtitle {
        ...RichText
      }

      items(first: 20) {
        ...Card
      }
    }
  }
`;
