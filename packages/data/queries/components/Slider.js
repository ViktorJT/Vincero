import { RichTextFragment } from "../fragments/RichText";
import { BlockFragment } from "../fragments/Block";
import { AssetFragment } from "../fragments/Asset";
import { LinkFragment } from "../fragments/Link";

export const SliderQuery = `
  ${RichTextFragment}
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
