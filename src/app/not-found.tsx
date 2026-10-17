import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">404</p>
      <h1>Producto no encontrado.</h1>
      <Link href="/">Volver a imprenta y corte</Link>
    </main>
  );
}
