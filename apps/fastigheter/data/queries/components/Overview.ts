import { RichTextFragment } from "../fragments/RichText";
import { AssetFragment } from "../fragments/Asset";
import { LinkFragment } from "../fragments/Link";
import { CardFragment } from "../fragments/Card";

export const OverviewQuery = `
  ${RichTextFragment}
  ${AssetFragment}
  ${CardFragment}
  ${LinkFragment}

  query GetOverviewByID($id: ID!) {
    overview(where: { id: $id }) {
      __typename
      id

      title
      subtitle

      items(first: 100) {
        ...Card
      }
    }
  }
`;
