export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="invest" lang="en">
      <body>{children}</body>
    </html>
  );
}
