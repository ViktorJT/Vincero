import { throttledFetchData } from "@/utils/fetchData";

export const navigationQuery = `
  {
    navigation(where: {id: "cm37kqz25jgir07mjaq641dsl"}) {
      leftColumn(first: 5) {
        id
        displayText
        description
        variant
        external
        page {
          id
          title
          slug
        }
        anchor
        externalUrl
        # subLinks(first: 6) {
        #  id
        #  __typename
        #  stage
        #}
        advancedSettings
        relAttribute
        titleAttribute
        ariaLabel
      }
      rightColumn(first: 5) {
        id
        displayText
        description
        variant
        external
        page {
          id
          title
        }
        anchor
        externalUrl
        # subLinks(first: 6) {
        #  id
        #  __typename
        #  stage
        #}
        advancedSettings
        relAttribute
        titleAttribute
        ariaLabel
      }
    }

    siteSettings(where: {id: "cm38r06hb3o3707l01eizx6qo"}) {
      logo {
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
    }
  }
`;

export async function getLayout() {
  const { navigation, siteSettings } = await throttledFetchData({
    query: navigationQuery,
  });

  return {
    navigation,
    footer: {
      ...navigation,
      ...siteSettings,
    },
  };
}
