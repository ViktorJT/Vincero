import { RichTextFragment } from "../fragments/RichText";

export const TextQuery = `
  ${RichTextFragment}

  query GetTextByID($id: ID!, $locale: Locale!) {
    text(where: { id: $id }, locales: [$locale, en]) {
      __typename
      id

      title {
        ...RichText
      }

      text {
        ...RichText
      }
    }
  }
`;
