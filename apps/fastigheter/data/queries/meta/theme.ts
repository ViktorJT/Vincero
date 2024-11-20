export const themeQuery = `
  query GetTheme {
    themes(first: 1) {
      __typename
      id

      black {
        css
      }
      light {
        css
      }
      dark {
        css
      }
      muted {
        css
      }
      accent {
        css
      }
    }
  }
`;
