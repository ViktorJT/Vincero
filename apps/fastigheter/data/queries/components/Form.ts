import { RichTextFragment } from "../fragments/RichText";
import { LockupFragment } from "../fragments/Lockup";
import { AssetFragment } from "../fragments/Asset";

export const FormQuery = `
  ${RichTextFragment}
  ${LockupFragment}
  ${AssetFragment}

  query GetFormByID($id: ID!) {
    form(where: { id: $id }) {
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
