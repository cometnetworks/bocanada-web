'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function RegisterPage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const { data, error } = await supabase.auth.signUp(
        { email, password },
        {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bocanada-web.vercel.app'}/dashboard`,
        }
      )

      if (error) {
        console.error('Error en el registro:', error.message)
        setMessage('Ocurrió un error al registrarte. Intenta de nuevo.')
      } else {
        console.log('Registro exitoso:', data)
        setMessage('Revisa tu correo para confirmar tu registro.')
      }
    } catch (err) {
      console.error('Error inesperado:', err)
      setMessage('Ocurrió un error inesperado. Intenta más tarde.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Crea tu cuenta</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded text-black"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded text-black"
          required
        />
        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 transition p-3 rounded text-white font-semibold"
        >
          Registrarme
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-gray-300">{message}</p>}
    </div>
  )
}