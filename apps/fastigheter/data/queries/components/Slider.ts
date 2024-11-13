import { SlideBlockFragment } from "@/data/queries/fragments/SlideBlock";
import { LinkFragment } from "@/data/queries/fragments/Link";

export const SliderQuery = `
  ${LinkFragment}
  ${SlideBlockFragment}

  query GetSliderByID($id: ID!) {
    slider(where: { id: $id }) {
      __typename
      id

      blocks {
        ...SlideBlock
      }
    }
  }
`;
