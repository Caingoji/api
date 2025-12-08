"use client";

import { useState } from "react";

export default function LoginGeneral() {
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
    setMensaje("Verificando...");

    try {
      // === 1. Buscar CLIENTES ===
      const resClientes = await fetch("http://127.0.0.1:8000/clientes/");
      const clientes = await resClientes.json();

      const cliente = clientes.find(
        (c) =>
          c.correo === form.correo &&
          c.contrasena === form.contrasena
      );

      if (cliente) {
        localStorage.setItem("usuario", JSON.stringify({
          tipo: "cliente",
          ...cliente
        }));

        window.location.href = "/cliente";
        return;
      }

      // === 2. Buscar EMPLEADOS ===
      const resEmpleados = await fetch("http://127.0.0.1:8000/empleados/");
      const empleados = await resEmpleados.json();

      const empleado = empleados.find(
        (e) =>
          e.correo === form.correo &&
          e.contrasena === form.contrasena
      );

      if (empleado) {
        localStorage.setItem("usuario", JSON.stringify({
          tipo: "empleado",
          ...empleado
        }));

        window.location.href = "/empleado";
        return;
      }

      // === 3. Si no coincide en ninguna tabla ===
      setMensaje("❌ Credenciales incorrectas");

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
