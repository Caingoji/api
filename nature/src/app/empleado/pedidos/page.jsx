"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function EmpleadoPedidos() {
  const [empleado, setEmpleado] = useState(null);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("empleado");

    if (!data) {
      window.location.href = "/empleado/login";
      return;
    }

    setEmpleado(JSON.parse(data));

    // Obtener pedidos al cargar
    fetch("http://127.0.0.1:8000/pedidos/")
      .then((res) => res.json())
      .then((data) => setPedidos(data));
  }, []);

  if (!empleado) return <h2>Cargando...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pedidos del sistema</h1>

      {/* ⭐ NUEVO BOTÓN ARRIBA DEL TODO */}
      <Link href="/empleado/pedidos/crear">
        <button style={{ marginBottom: "20px" }}>Crear Pedido</button>
      </Link>

      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.id}>
            <strong>ID:</strong> {pedido.id} - {pedido.calle}  
            <br />

            {/* Botón Editar */}
            <Link href={`/empleado/pedidos/editar/${pedido.id}`}>
              <button>Editar</button>
            </Link>

            {/* Botón Eliminar */}
            <button
              onClick={async () => {
                await fetch(`http://127.0.0.1:8000/pedidos/${pedido.id}/`, {
                  method: "DELETE",
                });
                window.location.reload();
              }}
            >
              Eliminar
            </button>

            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
