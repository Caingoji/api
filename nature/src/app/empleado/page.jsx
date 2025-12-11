"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function EmpleadoHome() {
  const [empleado, setEmpleado] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("empleado");

    if (!data) {
      window.location.href = "/empleado/login";
      return;
    }

    setEmpleado(JSON.parse(data));
  }, []);

  if (!empleado) return <h2>Cargando...</h2>;

  const cerrarSesion = () => {
    localStorage.removeItem("empleado");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bienvenido, {empleado.nombre} 👋</h1>

      <p><strong>Correo:</strong> {empleado.correo}</p>
      <p><strong>Cargo:</strong> {empleado.cargo}</p>

      <div style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "15px" }}>

        {/* Ver pedidos */}
        <Link href="/empleado/pedidos">
          <button style={btnStyle}>📦 Ver pedidos</button>
        </Link>

        {/* Cerrar sesión */}
        <button style={cerrarStyle} onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: "12px 20px",
  background: "#3a86ff",
  color: "white",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
  border: "none",
};

const cerrarStyle = {
  padding: "12px 20px",
  background: "#ff4d4d",
  color: "white",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
  border: "none",
};
