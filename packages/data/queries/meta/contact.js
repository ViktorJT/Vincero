import { ValueFragment } from "../fragments/Value";

export const contactQuery = `
  ${ValueFragment}

  query GetContact {
    contacts(first: 1) {
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
