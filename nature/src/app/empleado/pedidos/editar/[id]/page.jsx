"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditarPedido() {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    cargarPedido();
  }, []);

  const cargarPedido = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/pedidos/${id}/`);
      const data = await res.json();
      setPedido(data);
    } catch (error) {
      setMensaje("⚠ Error al cargar el pedido");
    }
  };

  const guardarCambios = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://127.0.0.1:8000/pedidos/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });

      if (!res.ok) {
        setMensaje("⚠ Error al guardar");
        return;
      }

      setMensaje("✔ Pedido actualizado correctamente");
    } catch {
      setMensaje("⚠ Error al conectar con la API");
    }
  };

  if (!pedido) return <h2>Cargando pedido...</h2>;

  const actualizarCampo = (e) => {
    setPedido({ ...pedido, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Editando Pedido #{id}</h1>

      <form onSubmit={guardarCambios}>

        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={pedido.nombre || ""}
          onChange={actualizarCampo}
        />

        <label>Dirección</label>
        <input
          type="text"
          name="direccion"
          value={pedido.direccion}
          onChange={actualizarCampo}
        />

        <label>Teléfono</label>
        <input
          type="text"
          name="telefono"
          value={pedido.telefono || ""}
          onChange={actualizarCampo}
        />

        <label>Cantidad de bidones</label>
        <input
          type="number"
          name="cantidad_bidones"
          value={pedido.cantidad_bidones}
          onChange={actualizarCampo}
        />

        <label>Estado</label>
        <select
          name="estado"
          value={pedido.estado}
          onChange={actualizarCampo}
        >
          <option value="espera">En espera</option>
          <option value="camino">En camino</option>
          <option value="entregado">Entregado</option>
        </select>

        <button type="submit" style={{ marginTop: "15px" }}>
          Guardar cambios
        </button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
