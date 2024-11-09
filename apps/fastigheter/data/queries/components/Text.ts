import { LockupFragment } from "@/data/queries/fragments/Lockup";
import { RichTextFragment } from "../fragments/RichText";

export const TextQuery = `
  ${LockupFragment}
  ${RichTextFragment}

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
