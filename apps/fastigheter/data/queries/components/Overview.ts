import { CalloutFragment } from "@/data/queries/fragments/Callout";
import { LinkFragment } from "@/data/queries/fragments/Link";

export const OverviewQuery = `
  ${LinkFragment}
  ${CalloutFragment}

  query GetOverviewByID($id: ID!) {
    overview(where: { id: $id }) {
      __typename
      id

      title
      subtitle

      pages(first: 50) {
        ... on Page {
          title
          description
          slug

          parentPage {
            ... on Page {
              slug
            }
          }

          image {
            ...Asset
          }
        }
      }

      callout {
        ...Callout
      }
    }
  }
`;
