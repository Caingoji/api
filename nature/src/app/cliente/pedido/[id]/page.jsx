"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PedidoClienteDetalle() {
  const { id } = useParams(); // ← AQUÍ SE ARREGLA TODO
  const [pedido, setPedido] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function cargar() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/pedidos/${id}/`);
        const data = await res.json();
        setPedido(data);
      } catch (error) {
        console.error("Error cargando pedido", error);
      }
      setCargando(false);
    }

    cargar();
  }, [id]);

  if (cargando) {
    return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Cargando...</h2>;
  }

  if (!pedido) {
    return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Pedido no encontrado 😢</h2>;
  }

  const estadoClase = {
    espera: "card espera activo",
    camino: "card camino activo",
    entregado: "card entregado activo",
  };

  return (
    <div className="main-center">
      <h2 style={{ color: "#0d47a1" }}>Detalles del Pedido</h2>

      <div className="info">
        <p><strong>ID:</strong> {pedido.id}</p>
        <p><strong>Cantidad de bidones:</strong> {pedido.cantidad_bidones}</p>
        <p><strong>Calle:</strong> {pedido.calle}</p>
        <p><strong>Dirección:</strong> {pedido.direccion}</p>
        <p><strong>Teléfono:</strong> {pedido.telefono}</p>
        <p><strong>Fecha:</strong> {new Date(pedido.fecha_creacion).toLocaleString()}</p>
      </div>

      <div className="estados">
        <h3>Estado Actual</h3>

        <div className={estadoClase[pedido.estado]}>
          {pedido.estado.toUpperCase()}
        </div>
      </div>

      <Link href="/cliente" className="btn-volver">
        ← Volver al menú
      </Link>
    </div>
  );
}
