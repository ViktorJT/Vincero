import Home from "../page";

export default async function LocalizedHome({
  params,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
}) {
  const { locale } = await params;
  return <Home params={{ locale }} />;
}
