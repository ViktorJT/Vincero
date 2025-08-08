import { RichTextFragment } from "../fragments/RichText";
import { LinkFragment } from "../fragments/Link";

export const ListQuery = `
  ${RichTextFragment}  
  ${LinkFragment}

  query ($id: ID!, $locale: Locale!) {
    list(where: { id: $id }, locales: [$locale, en]) {
      __typename
      id

      title {
        ...RichText
      }
      subtitle {
        ...RichText
      }

      moreLabel
      lessLabel

      items(first: 100) {
        id

        title
        date
        body

        link {
          ...Link
        }
      }
    }
  }
`;
