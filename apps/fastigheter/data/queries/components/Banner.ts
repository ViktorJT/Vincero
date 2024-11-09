import { RichTextFragment } from "../fragments/RichText";

export const BannerQuery = `
  ${RichTextFragment}

  query GetBannerByID($id: ID!) {
    banner(where: { id: $id }) {
      __typename
      id

      title

      textBlocks {
        ...RichText
      }
    }
  }
`;
