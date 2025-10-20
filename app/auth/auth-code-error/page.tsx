'use client';

import Link from 'next/link';

export default function AuthCodeError() {
  return (
    <div style={{ maxWidth: '420px', margin: '96px auto', textAlign: 'center' }}>
      <h2>Error de Autenticación</h2>
      <p>
        El enlace de confirmación no es válido, ha expirado o ya ha sido utilizado.
      </p>
      <p style={{ marginTop: '24px' }}>
        Por favor, intenta iniciar sesión o regístrate de nuevo.
      </p>
      <div style={{ marginTop: '32px' }}>
        <Link href="/auth/login" style={{ marginRight: '16px' }}>
          Ir a Login
        </Link>
        <Link href="/auth/register">
          Ir a Registro
        </Link>
      </div>
    </div>
  );
}
