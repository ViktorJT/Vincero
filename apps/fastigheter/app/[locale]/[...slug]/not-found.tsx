import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404 - Page Not Found</h1>
      <h2>Vincero Fastigheter</h2>
      <Link href="/" style={{ color: "blue", textDecoration: "underline" }}>
        Tillbaka till vår hemsida
      </Link>
    </div>
  );
}
