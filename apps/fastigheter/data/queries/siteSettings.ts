export const siteSettingsQuery = `
  {
    siteSettings(where: {id: "cm3g6nzht0qv507mnkbhwgztj"}) {
      id

      siteTitle

      defaultMetaTitle
      defaultMetaDescription
      defaultMetaImage 
      logo

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
