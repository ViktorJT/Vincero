import { AssetFragment } from "./fragments/Asset";

export const metadataQuery = `
  ${AssetFragment}

  query GetSiteSettings {
    siteSettings(where: {id: "cm3g6nzht0qv507mnkbhwgztj"}) {
      siteTitle
      defaultMetaTitle
      defaultMetaDescription
      defaultMetaImage

      favicon {
        ...Asset
      }
    }
  }
`;
