"use client";

import Link from "next/link";

export default function AvisoPage() {
  return (
    <div className="main-center">

      <h1>¡Pedido Realizado con Éxito! 🎉</h1>

      <p>
        Tu solicitud ha sido enviada correctamente.  
        Nuestros repartidores la estarán procesando pronto.
      </p>

      <Link href="/" className="btn-volver">
        Volver al Menú Principal
      </Link>

    </div>
  );
}
