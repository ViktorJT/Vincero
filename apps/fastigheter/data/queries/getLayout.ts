import { throttledFetchData } from "@/utils/fetchData";
import { LinkFragment } from "@/data/queries/fragments/Link";

export const navigationQuery = `
  ${LinkFragment}

  query GetLayout{
    navigation(where: {id: "cm37kqz25jgir07mjaq641dsl"}) {
      leftColumn(first: 5) {
        ...Link

        subLinks(first: 6) {
          ...Link
        }
      }

      rightColumn(first: 5) {
        ...Link

        subLinks(first: 6) {
          ...Link
        }
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
