import { RichTextFragment } from "../fragments/RichText";
import { AssetFragment } from "../fragments/Asset";
import { CardFragment } from "../fragments/Card";
import { LinkFragment } from "../fragments/Link";

export const CarouselQuery = `
  ${RichTextFragment}  
  ${AssetFragment}  
  ${CardFragment}  
  ${LinkFragment}  

  query GetCarouselByID($id: ID!) {
    carousel(where: { id: $id }) {
      __typename
      id

      title
      subtitle

      mediaClass

      items(first: 20) {
        ...Card
      }
    }
  }
`;
