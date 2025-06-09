import { AssetFragment } from "../fragments/Asset";

export const siteQuery = `
  ${AssetFragment}

  query GetSite {
    sites(first: 1) {
      __typename
      id
      
      logoLight {
        ...Asset
      }

      logoDark {
        ...Asset
      }
      
      copyrightInformation
    }
  }
`;
