import { RichTextFragment } from "../fragments/RichText";
import { AssetFragment } from "../fragments/Asset";

export const HeaderQuery = `
  ${AssetFragment}
  ${RichTextFragment}

  query GetHeaderByID($id: ID, $locale: Locale!) {
    header(where: { id: $id }, locales: [$locale, en]) {
      __typename
      id

      heading {
        ...RichText
      }
      headingAlignment

      asset { 
        ...Asset
      }

      fullscreen
      assetPosition
    }
  }
`;
