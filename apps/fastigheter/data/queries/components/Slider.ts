import { BlockFragment } from "@/data/queries/fragments/Block";
import { AssetFragment } from "@/data/queries/fragments/Asset";
import { LinkFragment } from "@/data/queries/fragments/Link";

export const SliderQuery = `
  ${BlockFragment}
  ${LinkFragment}
  ${AssetFragment}

  query GetSliderByID($id: ID!, $locale: Locale!) {
    slider(where: { id: $id }, locales: [$locale, en]) {
      __typename
      id

      blocks {
        ...Block
      }
    }
  }
`;
