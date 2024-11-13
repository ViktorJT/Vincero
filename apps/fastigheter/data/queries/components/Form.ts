import { RichTextFragment } from "../fragments/RichText";
import { LockupFragment } from "../fragments/Lockup";

export const FormQuery = `
  ${RichTextFragment}
  ${LockupFragment}

  query GetFormByID($id: ID!) {
    form(where: { id: $id }) {
      __typename
      id

      submitButtonLabel
      action

      image

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
