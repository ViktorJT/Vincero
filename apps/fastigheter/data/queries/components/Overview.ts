import { RichTextFragment } from "../fragments/RichText";
import { CardLinkFragment } from "../fragments/CardLink";
import { AssetFragment } from "../fragments/Asset";
import { CardFragment } from "../fragments/Card";

export const OverviewQuery = `
  ${RichTextFragment}
  ${CardLinkFragment}
  ${CardFragment}
  ${AssetFragment}

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
