import { throttledFetchData } from "@/utils/fetchData";

interface ThemeData {
  themes: Array<{
    black: { css: string };
    dark: { css: string };
    muted: { css: string };
    accent: { css: string };
    light: { css: string };
    white: { css: string };
  }>;
}

export async function getTheme() {
  const query = `
    query GetTheme {
      themes(first: 1) {
        black { css }
        dark { css }
        muted { css }
        accent { css }
        light { css }
        white { css }
      }
    }
  `;

  const data = await throttledFetchData<ThemeData>({ query });

  if (!data) {
    throw new Error("Unable to fetch theme");
  }

  return data.themes[0];
}
