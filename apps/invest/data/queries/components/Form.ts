import { RichTextFragment } from "../fragments/RichText";
import { LockupFragment } from "../fragments/Lockup";
import { AssetFragment } from "../fragments/Asset";

export const FormQuery = `
  ${RichTextFragment}
  ${LockupFragment}
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

      text {
        ...Lockup
      }

      fields(first: 5) {
        __typename
        id

        type
        label
        placeholder
        required
      }
    }
  }
`;
