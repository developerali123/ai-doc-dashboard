'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import Link from 'next/link'
import axios from 'axios'
import { useAuth } from '../../../context/AuthContext'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useRef<Toast>(null)
  const router = useRouter()
  const { login: loginContext } = useAuth()

  const handleLogin = async () => {
    if (!email || !password) {
      toast.current?.show({ severity: 'warn', summary: 'Email and Password required', life: 3000 })
      return
    }

    try {
      setLoading(true)

      const res = await axios.post('http://localhost:4000/api/auth/login', { email, password })
      console.log(res)

      const { token, user } = res.data
      loginContext(token, user)

      toast.current?.show({ severity: 'success', summary: 'Login successful', life: 2000 })

      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    } catch (error: any) {
      toast.current?.show({
        severity: 'error',
        summary: 'Login failed',
        detail: error.response?.data?.message || 'Server error',
        life: 4000,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page-container">
      <Toast ref={toast} />
      <div className="login-box">
        <h2 className="text-center mb-4">Login</h2>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" toggleMask feedback={false} />
        </div>

        <div className="form-action">
          <Button label={loading ? 'Logging in...' : 'Login'} icon="pi pi-sign-in" onClick={handleLogin} disabled={loading} className="p-button-rounded p-button-primary w-full" />
        </div>

        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <Link href="/register" className="text-blue-500 font-medium">Register</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
