import { SlideBlockFragment } from "@/data/queries/fragments/SlideBlock";
import { AssetFragment } from "@/data/queries/fragments/Asset";
import { LinkFragment } from "@/data/queries/fragments/Link";

export const SliderQuery = `
  ${AssetFragment}
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
