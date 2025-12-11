"use client";

import { useState, useEffect } from "react";

export default function CrearPedido() {
  const [empleado, setEmpleado] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    cantidad_bidones: 1,
    calle: "",
    estado: "espera",
    empleado: null, // se rellenará con el empleado logueado
  });

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    // Cargar datos del empleado desde localStorage
    const data = localStorage.getItem("empleado");
    if (!data) {
      window.location.href = "/empleado/login";
      return;
    }

    const emp = JSON.parse(data);
    setEmpleado(emp);
    setForm((prev) => ({ ...prev, empleado: emp.id }));
  }, []);

  const manejarCambio = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const crearPedido = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/pedidos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setMensaje("⚠ Error al crear pedido");
        return;
      }

      setMensaje("✔ Pedido creado exitosamente");

      // limpiar formulario
      setForm({
        nombre: "",
        telefono: "",
        direccion: "",
        cantidad_bidones: 1,
        calle: "",
        estado: "espera",
        empleado: empleado.id,
      });
    } catch (error) {
      setMensaje("⚠ Error al conectar con la API");
    }
  };

  if (!empleado) return <h2>Cargando...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Crear nuevo pedido</h1>
      <p>Empleado asignado: <strong>{empleado.nombre}</strong></p>

      <form onSubmit={crearPedido} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>

        <input 
          type="text" 
          name="nombre" 
          placeholder="Nombre del cliente"
          value={form.nombre}
          onChange={manejarCambio}
        />

        <input 
          type="text" 
          name="telefono" 
          placeholder="Número del cliente"
          value={form.telefono}
          onChange={manejarCambio}
        />

        <input 
          type="text" 
          name="direccion" 
          placeholder="Dirección"
          value={form.direccion}
          onChange={manejarCambio}
        />

        <input 
          type="text" 
          name="calle" 
          placeholder="Calle"
          value={form.calle}
          onChange={manejarCambio}
        />

        <input 
          type="number"
          name="cantidad_bidones"
          min="1"
          value={form.cantidad_bidones}
          onChange={manejarCambio}
        />

        <select 
          name="estado" 
          value={form.estado} 
          onChange={manejarCambio}
        >
          <option value="espera">En espera</option>
          <option value="camino">En camino</option>
          <option value="entregado">Entregado</option>
        </select>

        <button type="submit">Crear pedido</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
