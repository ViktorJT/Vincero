import { AssetFragment } from "../fragments/Asset";
import { ValueFragment } from "../fragments/Value";

export const FormQuery = `
  ${ValueFragment}
  ${AssetFragment}

  query GetFormByID($id: ID!, $locale: Locale!) {
    form(where: { id: $id }, locales: [$locale, en]) {
      __typename
      id

      submitButtonLabel
      action

      image {
        ...Asset
      }

      fields(first: 5) {
        __typename
        id

        type
        label
        placeholder
        required
      }

      contact {
        ... on Contact {
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
    }
  }
`;
