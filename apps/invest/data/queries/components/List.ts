import { LinkFragment } from "../fragments/Link";

export const ListQuery = `
  ${LinkFragment}

  query ($id: ID!, $locale: Locale!) {
    list(where: { id: $id }, locales: [$locale, en]) {
      __typename
      id

      items(first: 50) {
        id

        title
        body

        link {
          ...Link
        }
      }
    }
  }
`;
