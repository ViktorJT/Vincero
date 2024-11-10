export const metadataQuery = `
  query GetSiteSettings {
    siteSettings(where: {id: "cm38r06hb3o3707l01eizx6qo"}) {
      siteTitle
      defaultMetaTitle
      defaultMetaDescription
      defaultMetaImage {
        id
        altText
        url
        width
        height
      }

      favicon {
        id
        altText
        mimeType
        url
        width
        height
      }
    }
  }
`;
