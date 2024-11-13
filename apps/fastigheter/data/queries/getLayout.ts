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

    siteSettings(where: {id: "cm3g6nzht0qv507mnkbhwgztj"}) {
      logo

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
  // @todos types here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { navigation, siteSettings }: any = await throttledFetchData({
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
