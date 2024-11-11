import { AssetFragment } from "@/data/queries/fragments/Asset";

export const HeaderQuery = `
  ${AssetFragment}

  query GetHeaderByID($id: ID!) {
    header(where: { id: $id }) {
      __typename
      id

      title
      subtitle

      background {
        ...Asset
      }
    }
  }
`;
