import { RichTextFragment } from "../fragments/RichText";
import { UnitCardFragment } from "../fragments/UnitCard";
import { TeamCardFragment } from "../fragments/TeamCard";
import { AssetFragment } from "../fragments/Asset";
import { ValueFragment } from "../fragments/Value";
import { CardFragment } from "../fragments/Card";
import { LinkFragment } from "../fragments/Link";

export const OverviewQuery = `
  ${RichTextFragment}
  ${TeamCardFragment}
  ${UnitCardFragment}
  ${AssetFragment}
  ${ValueFragment}
  ${CardFragment}
  ${LinkFragment}

  query GetOverviewByID($id: ID!, $locale: Locale!) {
    overview(where: { id: $id }, locales: [$locale, en]) {
      __typename
      id

      title {
        ...RichText
      }
      subtitle {
        ...RichText
      }

      items(first: 100) {
        ...Card
        ...TeamCard
        ...UnitCard
      }
    }
  }
`;
