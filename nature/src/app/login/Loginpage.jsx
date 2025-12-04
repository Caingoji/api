"use client";

import { useState } from "react";

export default function LoginCliente() {
  const [form, setForm] = useState({
    correo: "",
    contrasena: "",
  });

  const [mensaje, setMensaje] = useState("");

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/clientes/");
      const clientes = await res.json();

      const encontrado = clientes.find(
        (c) =>
          c.correo === form.correo &&
          c.contrasena === form.contrasena
      );

      if (!encontrado) {
        setMensaje("❌ Credenciales incorrectas");
        return;
      }


      localStorage.setItem("cliente", JSON.stringify(encontrado));
      window.location.href = "/cliente";

      setMensaje("✔ Sesión iniciada");
    } catch (error) {
      setMensaje("⚠ Error al conectar con la API");
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={iniciarSesion}>
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
        <button type="submit">Entrar</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
