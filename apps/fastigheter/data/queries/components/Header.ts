import { AssetFragment } from "@/data/queries/fragments/Asset";
import { LinkFragment } from "@/data/queries/fragments/Link";

export const HeaderQuery = `
  ${AssetFragment}
  ${LinkFragment}

  query GetHeaderByID($id: ID!) {
    header(where: { id: $id }) {
      __typename
      id

      title
      subtitle

      links(first: 8) {
        ...Link

        subLinks(first: 6) {
          ...Link
        }
      }

      background {
        ...Asset
      }
    }
  }
`;
