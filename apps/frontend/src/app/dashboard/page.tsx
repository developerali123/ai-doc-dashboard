'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from 'primereact/button'
import { useAuth } from '../../../context/AuthContext'
import DocumentListPage from '../documents/page'

const DashboardPage = () => {
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return null // Optionally show a loader
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.name}!</h1>
      <p>Your email: {user.email}</p>

      <Button label="Logout" icon="pi pi-sign-out" className="p-button-danger" onClick={logout} />
      <DocumentListPage />
    </div>
  )
}

export default DashboardPage
