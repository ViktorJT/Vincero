import { ValueFragment } from "../fragments/Value";

export const contactQuery = `
  ${ValueFragment}

  query GetContact($locale: Locale!) {
    contacts(first: 1, locales: [$locale, en]) {
      __typename
      id

      name
      phone {
        ...Value
      }
      email {
        ...Value
      }
      address {
        ...Value
      }
      postalCode {
        ...Value
      }
      city {
        ...Value
      }
    }
  }
`;
