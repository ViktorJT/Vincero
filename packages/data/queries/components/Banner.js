import { RichTextFragment } from "../fragments/RichText";

export const BannerQuery = `
  ${RichTextFragment}

  query GetBannerByID($id: ID!,  $locale: Locale!) {
    banner(where: { id: $id }, locales: [$locale, en]) {
      __typename
      id
 
      title {
        ...RichText
      }

      textBlocks {
        ...RichText
      }
    }
  }
`;
