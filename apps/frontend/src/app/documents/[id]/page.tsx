'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { useAuth } from '../../../../context/AuthContext'

type Document = {
  id: string
  title: string
  description: string
  tags: string[]
  createdAt: string
  updatedAt: string
  summary?: string
}

const DocumentViewPage = () => {
  const { user } = useAuth()
  const params = useParams()
  const router = useRouter()

  const [doc, setDoc] = useState<Document | null>(null)
  const [loading, setLoading] = useState(false)
  const [generatingSummary, setGeneratingSummary] = useState(false)

  const fetchDocument = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`http://localhost:4000/api/documents/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setDoc(res.data)
    } catch (err) {
      console.error('Error fetching document', err)
    }
  }

  const handleSummary = async () => {
    try {
      setGeneratingSummary(true)
      const token = localStorage.getItem('token')
      const res = await axios.get(
        `http://localhost:4000/api/documents/${params.id}/summary`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setDoc((prev) => prev ? { ...prev, summary: res.data.summary } : prev)
    } catch (err) {
      console.error('Error generating summary', err)
    } finally {
      setGeneratingSummary(false)
    }
  }

  const handleEdit = () => router.push(`/documents/edit/${params.id}`)

  useEffect(() => {
    if (user) fetchDocument()
    else router.push('/login')
  }, [user])

  if (!doc || !user) return <p>Loading document...</p>

  return (
    <div className="document-view-container">
      <Card title={doc.title} subTitle={`Tags: ${doc.tags.join(', ')}`}>
        <p>{doc.description}</p>
        <p>
          <strong>Created At:</strong> {new Date(doc.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Updated At:</strong> {new Date(doc.updatedAt).toLocaleString()}
        </p>

        <div className="actions">
          <Button label="Edit" icon="pi pi-pencil" onClick={handleEdit} />
          <Button
            label="Generate Summary"
            icon="pi pi-comment"
            loading={generatingSummary}
            onClick={handleSummary}
            severity="info"
          />
        </div>

        {doc.summary && (
          <div className="summary-box">
            <h4>AI Summary:</h4>
            <p>{doc.summary}</p>
          </div>
        )}
      </Card>
    </div>
  )
}

export default DocumentViewPage
