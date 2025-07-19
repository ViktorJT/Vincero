import { RichTextFragment } from "../fragments/RichText";
import { UnitCardFragment } from "../fragments/UnitCard";
import { TeamCardFragment } from "../fragments/TeamCard";
import { AssetFragment } from "../fragments/Asset";
import { ValueFragment } from "../fragments/Value";
import { LinkFragment } from "../fragments/Link";

export const OverviewQuery = `
  ${RichTextFragment}
  ${TeamCardFragment}
  ${UnitCardFragment}
  ${AssetFragment}
  ${ValueFragment}
  ${LinkFragment}

  query GetOverviewByID($id: ID!, $locale: Locale!) {
    overview(where: { id: $id }, locales: [$locale, en]) {
      __typename
      id

      title
      subtitle

      items(first: 100) {
        ...TeamCard
        ...UnitCard
      }
    }
  }
`;
