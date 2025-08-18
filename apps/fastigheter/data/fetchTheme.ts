import { throttledFetchData } from "@/data/fetchData";

type Rgba = {
  r: number;
  g: number;
  b: number;
  a: number;
};

type RgbaTheme = {
  rgba: Rgba;
};

interface ThemeData {
  themes: Array<{
    black: RgbaTheme;
    dark: RgbaTheme;
    muted: RgbaTheme;
    light: RgbaTheme;
    white: RgbaTheme;
  }>;
}

type Theme = ThemeData["themes"][number];

export async function fetchTheme(): Promise<Theme> {
  const query = `
    fragment ColorFields on Color {
      rgba {
        ... on RGBA {
          r
          g
          b
          a
        }
      }
    }

    query FetchTheme {
      themes(first: 1) {
        black { ...ColorFields }
        dark  { ...ColorFields }
        muted { ...ColorFields }
        light { ...ColorFields }
        white { ...ColorFields }
      }
    }
  `;

  const data = await throttledFetchData<ThemeData>({ query });

  if (!data || !data.themes?.length) {
    throw new Error("Unable to fetch theme");
  }

  return data.themes[0];
}
