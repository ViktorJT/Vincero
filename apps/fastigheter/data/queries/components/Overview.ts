import { CalloutFragment } from "@/data/queries/fragments/Callout";
import { AssetFragment } from "@/data/queries/fragments/Asset";
import { LinkFragment } from "@/data/queries/fragments/Link";

export const OverviewQuery = `
  ${LinkFragment}
  ${AssetFragment}
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
