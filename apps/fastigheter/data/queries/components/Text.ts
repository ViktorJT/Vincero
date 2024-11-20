import { RichTextFragment } from "../fragments/RichText";
import { LockupFragment } from "../fragments/Lockup";

export const TextQuery = `
  ${RichTextFragment}
  ${LockupFragment}

  query GetTextByID($id: ID!) {
    text(where: { id: $id }) {
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
