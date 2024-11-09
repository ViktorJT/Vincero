export const siteSettingsQuery = `
  {
    siteSettings(where: {id: "cm38r06hb3o3707l01eizx6qo"}) {
      id

      siteTitle
      siteUrl

      defaultMetaTitle
      defaultMetaDescription
      defaultMetaImage {
        id
        altText
        mimeType
        url
        width
        height
        __typename
      }

      logo {
        id
        altText
        mimeType
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

      contactPhone
      contactEmail
      contactName
      contactAddress
      contactPostalCode
      contactCity

      copyrightInformation

      blackColor {
        css
      }
      lightColor {
        css
      }
      darkColor {
        css
      }
      mutedColor {
        css
      }
      accentColor {
        css
      }
    }
  }
`;
