import { AssetFragment } from "../fragments/Asset";

export const MediaQuery = `
  ${AssetFragment}

  query GetMediaByID($id: ID!, $locale: Locale!) {
    media(where: { id: $id }, locales: [$locale, en]) {
      __typename
      id

      asset {
        ...Asset
      }
    }
  }
`;
