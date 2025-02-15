import { AssetFragment } from "../fragments/Asset";

export const seoQuery = `
  ${AssetFragment}

  query GetSEO {
    seos(first: 1) {
      __typename
      id

      siteTitle
      metaTitle
      metaDescription
      metaImage {
        ...Asset
      }
    }
  }
`;
