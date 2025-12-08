"use client";

import { useEffect, useState } from "react";

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

  return (
    <div>
      <h1>Bienvenido, {empleado.nombre}</h1>
      <p>Correo: {empleado.correo}</p>
      <p>Cargo: {empleado.cargo}</p>
    </div>
  );
}
