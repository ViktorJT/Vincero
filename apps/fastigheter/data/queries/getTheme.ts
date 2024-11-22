import { throttledFetchData } from "@/utils/fetchData";

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

  const data = await throttledFetchData({ query });

  return data.themes[0];
}
