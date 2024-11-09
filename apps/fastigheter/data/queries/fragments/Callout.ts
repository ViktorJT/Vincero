export const CalloutFragment = `
  fragment Callout on Callout {
    __typename
    id

    heading 
    body 
    links {
      ...Link
    }
  }
`;
