import { RichTextFragment } from "../fragments/RichText";
import { CardLinkFragment } from "../fragments/CardLink";
import { AssetFragment } from "../fragments/Asset";
import { CardFragment } from "../fragments/Card";

export const CarouselQuery = `
  ${CardLinkFragment}  
  ${RichTextFragment}  
  ${AssetFragment}  
  ${CardFragment}  

  query GetCarouselByID($id: ID!) {
    carousel(where: { id: $id }) {
      __typename
      id

      title
      subtitle

      items(first: 20) {
        ...Card
      }
    }
  }
`;
