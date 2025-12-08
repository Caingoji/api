"use client";
import { useState } from "react";

export default function RegistroCliente() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    direccion: "",
    telefono: "",
  });

  const [mensaje, setMensaje] = useState("");

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registrar = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/clientes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setMensaje("Error al registrar. Revisa los datos.");
        return;
      }

      setMensaje("Registro exitoso");
    } catch (error) {
      setMensaje("Error al conectar con la API");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Registro de Cliente</h2>

      <form onSubmit={registrar}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={manejarCambio}
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={form.correo}
          onChange={manejarCambio}
          required
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          value={form.contrasena}
          onChange={manejarCambio}
          required
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={form.direccion}
          onChange={manejarCambio}
          required
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={manejarCambio}
          required
        />

        <button type="submit">Registrarse</button>
      </form>

      {mensaje && <p>{mensaje}</p>}

      <style jsx>{`
        input {
          width: 100%;
          margin: 6px 0;
          padding: 10px;
        }
        button {
          margin-top: 10px;
          width: 100%;
          padding: 10px;
          background: blue;
          color: white;
        }
      `}</style>
    </div>
  );
}
