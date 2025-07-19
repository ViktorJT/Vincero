import { AssetFragment } from "../fragments/Asset";

export const HeaderQuery = `
  ${AssetFragment}

  query GetHeaderByID($id: ID, $locale: Locale!) {
    header(where: { id: $id }, locales: [$locale, en]) {
      __typename
      id

      title
      subtitle

      asset { 
        ...Asset
      }
    }
  }
`;
