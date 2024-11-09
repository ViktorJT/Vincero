import { AssetFragment } from "@/data/queries/fragments/Asset";
import { CalloutFragment } from "@/data/queries/fragments/Callout";

export const OverviewQuery = `
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

          image {
            ....Asset
          }
        }
      }

      callout {
        ...Callout
      }
    }
  }
`;
