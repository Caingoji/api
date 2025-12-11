"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PedidoPublico() {
  const router = useRouter();

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    cantidad_bidones: "",
    calle: ""
  });

  const [mensaje, setMensaje] = useState("");

  const cambiar = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const enviarPedido = async (e) => {
    e.preventDefault();

    const pedidoData = {
      nombre: form.nombre,
      telefono: form.telefono,
      direccion: form.direccion,
      cantidad_bidones: Number(form.cantidad_bidones),
      calle: form.calle
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/pedidos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedidoData),
      });

      if (!res.ok) {
        setMensaje("⚠ Error al crear el pedido");
        return;
      }

      // ⭐ REDIRECCIÓN A LA PÁGINA DE AVISO
      router.push("/publico/aviso");

    } catch (error) {
      setMensaje("⚠ Error al conectar con la API");
    }
  };

  return (
    <div className="main-center">

      <h1>Hacer Pedido (Público)</h1>

      {mensaje && <p className="mensaje error">{mensaje}</p>}

      <form onSubmit={enviarPedido}>
        <input type="text" name="nombre" placeholder="Nombre" onChange={cambiar} required />
        <input type="text" name="telefono" placeholder="Teléfono" onChange={cambiar} required />
        <input type="text" name="direccion" placeholder="Dirección Completa" onChange={cambiar} required />
        <input type="number" name="cantidad_bidones" placeholder="Cantidad de Bidones" onChange={cambiar} required />
        <input type="text" name="calle" placeholder="Calle" onChange={cambiar} required />

        <button type="submit">Confirmar Pedido</button>
      </form>

    </div>
  );
}
