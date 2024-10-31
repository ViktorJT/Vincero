export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="fastigheter" lang="en">
      <body>{children}</body>
    </html>
  );
}
