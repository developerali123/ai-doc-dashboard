'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import Link from 'next/link'
import axios from 'axios'

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useRef<Toast>(null)
  const router = useRouter()

  const handleRegister = async () => {
    if (!name || !email || !password) {
      toast.current?.show({ severity: 'warn', summary: 'All fields are required', life: 3000 })
      return
    }

    try {
      setLoading(true)
      const response = await axios.post('http://localhost:4000/api/auth/register', {
        name,
        email,
        password,
      })

      toast.current?.show({ severity: 'success', summary: 'Registered successfully!', life: 2000 })

      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } catch (error: any) {
      toast.current?.show({
        severity: 'error',
        summary: 'Registration failed',
        detail: error.response?.data?.message || 'Server error',
        life: 4000,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <Toast ref={toast} />
      <div className="auth-box">
        <h2>Create Account</h2>

        <div className="p-field w-full mb-3">
          <label htmlFor="name" className="block mb-2">Name</label>
          <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full" />
        </div>

        <div className="p-field w-full mb-3">
          <label htmlFor="email" className="block mb-2">Email</label>
          <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
        </div>

        <div className="p-field w-full mb-4">
          <label htmlFor="password" className="block mb-2">Password</label>
          <Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            toggleMask
            className="w-full"
            inputClassName="w-full"
          />
        </div>

        <Button
          label={loading ? 'Registering...' : 'Register'}
          icon="pi pi-user-plus"
          onClick={handleRegister}
          disabled={loading}
          className="p-button-rounded p-button-primary w-full mb-3"
        />

        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
