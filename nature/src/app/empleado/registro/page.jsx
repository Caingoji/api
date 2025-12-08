"use client";

import { useState } from "react";

export default function RegistroEmpleado() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    cargo: "",
  });

  const [mensaje, setMensaje] = useState("");

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registrar = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/empleados/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setMensaje("⚠ Error al registrar empleado");
        return;
      }

      setMensaje("✔ Empleado registrado correctamente");
    } catch {
      setMensaje("⚠ No se pudo conectar con la API");
    }
  };

  return (
    <div>
      <h1>Registro de Empleado</h1>

      <form onSubmit={registrar}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={manejarCambio}
        />

        <input
          type="email"
          name="correo"
          placeholder="Correo"
          onChange={manejarCambio}
        />

        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          onChange={manejarCambio}
        />

        <select name="cargo" onChange={manejarCambio}>
          <option value="">Seleccione un cargo</option>
          <option value="Repartidor">Repartidor</option>
          <option value="Administrador">Administrador</option>
          <option value="Atención al Cliente">Atención al Cliente</option>
        </select>

        <button type="submit">Registrar Empleado</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
