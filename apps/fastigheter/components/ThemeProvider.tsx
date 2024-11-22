import { getTheme } from "@/data/queries/getTheme";

export async function ThemeProvider() {
  const theme = await getTheme();

  const cssVars = `
    :root[data-theme="fastigheter"] {
      --white: ${theme.white.css};
      --light: ${theme.light.css};
      --muted: ${theme.muted.css};
      --dark: ${theme.dark.css};
      --black: ${theme.black.css};
      --accent: ${theme.accent.css};
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: cssVars }} />;
}
