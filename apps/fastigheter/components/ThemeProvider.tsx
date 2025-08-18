import { fetchTheme } from "@/data/fetchTheme";

export async function ThemeProvider() {
  const theme = await fetchTheme();

  const cssVars = `
    :root[data-theme="fastigheter"] {
      --white: ${theme.white.rgba.r} ${theme.white.rgba.g} ${theme.white.rgba.b};
      --light: ${theme.light.rgba.r} ${theme.light.rgba.g} ${theme.light.rgba.b};
      --muted: ${theme.muted.rgba.r} ${theme.muted.rgba.g} ${theme.muted.rgba.b};
      --dark: ${theme.dark.rgba.r} ${theme.dark.rgba.g} ${theme.dark.rgba.b};
      --black: ${theme.black.rgba.r} ${theme.black.rgba.g} ${theme.black.rgba.b};
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: cssVars }} />;
}
