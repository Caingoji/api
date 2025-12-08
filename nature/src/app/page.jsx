"use client";

import Link from "next/link";

export default function Home() {
  const btn = {
    padding: "12px 20px",
    margin: "10px 0",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    width: "200px",
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Bienvenido a Nature Andes</h1>

      <div
        style={{
          background: "#222",
          padding: "30px",
          borderRadius: "15px",
          display: "inline-block",
          marginTop: "20px",
        }}
      >
        <h2>¿Qué deseas hacer?</h2>

        {/* Registro Cliente */}
        <Link href="/registro">
          <button style={{ ...btn, background: "#28a745", color: "white" }}>
            Registrarme (Cliente)
          </button>
        </Link>

        {/* Registro Empleado */}
        <Link href="/empleado/registro">
          <button style={{ ...btn, background: "#ff9800", color: "white" }}>
            Registrarme (Empleado)
          </button>
        </Link>

        {/* Login general */}
        <Link href="/loginGeneral">
          <button style={{ ...btn, background: "#007bff", color: "white" }}>
            Iniciar Sesión
          </button>
        </Link>
      </div>
    </div>
  );
}
