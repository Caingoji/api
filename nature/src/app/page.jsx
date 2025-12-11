"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="main-center">

      <img src="/logo.png" className="logo" alt="Logo" />

      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}
      >
        <Link href="/cliente/registro" className="btn-secundario">
          Registrarse como Cliente
        </Link>

        <Link href="/empleado/registro" className="btn-empleado">
          Registrarse como Empleado
        </Link>

        <Link href="/loginGeneral" className="btn">
          Iniciar Sesión
        </Link>
      </div>

      <h1>Bienvenido a Agua Purificada</h1>
      <p>Solicita tu pedido de forma rápida y sencilla</p>

      <Link href="/publico" className="btn" style={{ marginTop: "20px" }}>
        Hacer Pedido sin Cuenta
      </Link>

    </div>
  );
}
