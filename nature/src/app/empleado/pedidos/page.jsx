"use client";

import { useEffect, useState } from "react";

export default function ListaPedidosEmpleado() {
  const [pedidos, setPedidos] = useState([]);

  const cargarPedidos = async () => {
    const res = await fetch("http://127.0.0.1:8000/pedidos/");
    const data = await res.json();
    setPedidos(data);
  };

  useEffect(() => {
    cargarPedidos();
  }, []);

  const eliminarPedido = async (id) => {
    if (!confirm("¿Eliminar pedido?")) return;

    await fetch(`http://127.0.0.1:8000/pedidos/${id}/`, {
      method: "DELETE",
    });

    cargarPedidos();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pedidos Registrados</h1>

      <table border="1" cellPadding="8" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente / Nombre</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Cantidad</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {pedidos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>

              <td>{p.cliente ? p.cliente.nombre : p.nombre}</td>

              <td>{p.cliente ? p.cliente.telefono : p.telefono}</td>

              <td>{p.calle || p.direccion}</td>

              <td>{p.cantidad_bidones}</td>

              <td>{p.estado}</td>

              <td>
                <button
                  onClick={() => (window.location.href = `/empleado/pedidos/${p.id}`)}
                  style={{ marginRight: "10px" }}
                >
                  ✏ Editar
                </button>

                <button onClick={() => eliminarPedido(p.id)} style={{ color: "red" }}>
                  🗑 Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
