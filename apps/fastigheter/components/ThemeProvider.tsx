import { fetchTheme } from "@/data/fetchTheme";

export async function ThemeProvider() {
  const theme = await fetchTheme();

  const cssVars = `
    :root[data-theme="fastigheter"] {
      --white: ${theme.white.css};
      --light: ${theme.light.css};
      --muted: ${theme.muted.css};
      --dark: ${theme.dark.css};
      --black: ${theme.black.css};
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: cssVars }} />;
}
