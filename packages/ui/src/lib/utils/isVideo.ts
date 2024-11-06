export const isVideo = ({ mimeType }: { mimeType: string }) =>
  mimeType?.startsWith("video/");
