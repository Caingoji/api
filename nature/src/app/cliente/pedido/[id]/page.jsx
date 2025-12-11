"use client";

import { useEffect, useState } from "react";
import { use } from "react";  // <- necesario para unwrap de params

export default function PedidoClienteDetalle({ params }) {
  const { id } = use(params); // desenvuelve la Promise correcta

  const [pedido, setPedido] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarPedido = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/pedidos/${id}/`);
        const data = await res.json();
        setPedido(data);
      } catch (error) {
        console.error("Error cargando pedido:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarPedido();
  }, [id]);

  if (cargando) return <h2>Cargando detalles...</h2>;
  if (!pedido) return <h2>No se encontró el pedido</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Detalles del Pedido</h1>

      <p><strong>ID:</strong> {pedido.id}</p>
      <p><strong>Cantidad de bidones:</strong> {pedido.cantidad_bidones}</p>
      <p><strong>Calle:</strong> {pedido.calle}</p>
      <p><strong>Dirección:</strong> {pedido.direccion || "No registrada"}</p>
      <p><strong>Teléfono:</strong> {pedido.telefono || "No registrado"}</p>
      <p><strong>Estado:</strong> {pedido.estado}</p>
      <p><strong>Fecha:</strong> {new Date(pedido.fecha_creacion).toLocaleString()}</p>
    </div>
  );
}
