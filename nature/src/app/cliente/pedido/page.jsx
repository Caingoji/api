"use client";

import { useState, useEffect } from "react";

export default function PedidoCliente() {
  const [cliente, setCliente] = useState(null);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    cantidad_bidones: "",
    calle: "",
    direccion: "",
    telefono: "",
  });

  // Verificar login
  useEffect(() => {
    const data = localStorage.getItem("cliente");
    if (!data) {
      window.location.href = "/cliente/login";
      return;
    }
    setCliente(JSON.parse(data));
  }, []);

  const cambiar = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const enviarPedido = async (e) => {
    e.preventDefault();

    if (!cliente) return;

    const pedidoData = {
      cliente: cliente.id,
      cantidad_bidones: Number(form.cantidad_bidones),
      calle: form.calle,
      direccion: form.direccion,
      telefono: form.telefono,
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/pedidos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedidoData),
      });

      if (!res.ok) {
        setMsg("⚠ Error al crear el pedido");
        return;
      }

      setMsg("✔ Pedido realizado con éxito");
    } catch (error) {
      setMsg("⚠ Error al conectar con la API");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Hacer Pedido</h1>

      <form onSubmit={enviarPedido} style={{ maxWidth: "400px" }}>
        <input
          type="number"
          name="cantidad_bidones"
          placeholder="Cantidad de bidones"
          onChange={cambiar}
          required
        />

        <input
          type="text"
          name="calle"
          placeholder="Calle"
          onChange={cambiar}
          required
        />

        <input
          type="text"
          name="direccion"
          placeholder="Dirección completa"
          onChange={cambiar}
          required
        />

        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          onChange={cambiar}
          required
        />

        <button type="submit">Confirmar Pedido</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}
