import { RichTextFragment } from "../fragments/RichText";
import { LockupFragment } from "../fragments/Lockup";

export const TextQuery = `
  ${RichTextFragment}
  ${LockupFragment}

  query GetTextByID($id: ID!, $locale: Locale!) {
    text(where: { id: $id }, locales: [$locale, en]) {
      __typename
      id

      metaInformation {
        ...Lockup
      }

      heading
      
      body {
        ...Lockup
      }
    }
  }
`;
