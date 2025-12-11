"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ClienteHome() {
  const [cliente, setCliente] = useState(null);
  const [ultimoPedido, setUltimoPedido] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("cliente");

    if (data) {
      setCliente(JSON.parse(data));
    }
  }, []);

  // Cargar el último pedido del cliente
  useEffect(() => {
    if (!cliente) return;

    async function cargarPedidos() {
      try {
        const res = await fetch("http://127.0.0.1:8000/pedidos/");
        const pedidos = await res.json();

        // filtrar por cliente_id
        const pedidosCliente = pedidos.filter(
          (p) => p.cliente === cliente.id
        );

        if (pedidosCliente.length > 0) {
          // tomar el más reciente
          const ultimo = pedidosCliente[pedidosCliente.length - 1];
          setUltimoPedido(ultimo);
        }
      } catch (err) {
        console.error("Error cargando pedidos", err);
      }
    }

    cargarPedidos();
  }, [cliente]);

  if (!cliente) return <h2>Cargando...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bienvenido, {cliente.nombre} 👋</h1>

      <p><strong>Correo:</strong> {cliente.correo}</p>
      <p><strong>Dirección:</strong> {cliente.direccion}</p>
      <p><strong>Teléfono:</strong> {cliente.telefono}</p>

      <br />

      <Link href="/cliente/pedido">
        <button className="btn">Hacer Pedido</button>
      </Link>

      <br /><br />

      {/* Botón para ver detalles */}
      {ultimoPedido ? (
        <Link href={`/cliente/pedido/${ultimoPedido.id}`}>
          <button className="btn">Ver Detalles de mi Pedido</button>
        </Link>
      ) : (
        <p>No tienes pedidos aún</p>
      )}

      <br /><br />

      <button
        className="btn-peligro"
        onClick={() => {
          localStorage.removeItem("cliente");
          window.location.href = "/";
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
