import { AssetFragment } from "../fragments/Asset";

export const HeaderQuery = `
  ${AssetFragment}

  query GetHeaderByID($id: ID!) {
    header(where: { id: $id }) {
      __typename
      id

      title
      subtitle

      asset { 
        ...Asset
      }
    }
  }
`;
