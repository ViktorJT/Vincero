import { LinkFragment } from "../fragments/Link";

export const ListQuery = `
  ${LinkFragment}

  query ($id: ID!, $locale: Locale!) {
    list(where: { id: $id }, locales: [$locale, en]) {
      __typename
      id

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
