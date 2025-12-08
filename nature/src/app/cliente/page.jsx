"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ClienteHome() {
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("cliente");

    if (data) {
      setCliente(JSON.parse(data));
    }
  }, []);

  if (!cliente) {
    return <h2>Cargando...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bienvenido, {cliente.nombre} 👋</h1>

      <p><strong>Correo:</strong> {cliente.correo}</p>
      <p><strong>Dirección:</strong> {cliente.direccion}</p>
      <p><strong>Teléfono:</strong> {cliente.telefono}</p>

      <br />

      <Link href="/cliente/pedido">
        <button>Hacer Pedido</button>
      </Link>
    </div>
  );
}
