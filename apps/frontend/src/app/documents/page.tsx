'use client'

import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'
import { Card } from 'primereact/card'
import { useAuth } from '../../../context/AuthContext'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'

type Document = {
  id: string
  title: string
  description: string
  tags: string[]
  createdAt: string
}

const DocumentListPage = () => {
  const { user } = useAuth()
  const router = useRouter()

  const [documents, setDocuments] = useState<Document[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const limit = 5

  const toast = useRef<Toast>(null)

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const res = await axios.get(`http://localhost:4000/api/documents`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: page + 1, limit, search },
      })
      setDocuments(res?.data?.data)
      setTotal(res.data.length)
    } catch (err) {
      console.error('Error fetching documents', err)
    } finally {
      setLoading(false)
    }
  }

  const deleteDocument = async (id: string) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:4000/api/documents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.current?.show({ severity: 'success', summary: 'Deleted', detail: 'Document deleted', life: 3000 })
      fetchDocuments()
    } catch (error) {
      toast.current?.show({ severity: 'error', summary: 'Failed', detail: 'Could not delete document', life: 3000 })
    }
  }

  const confirmDelete = (id: string) => {
    confirmDialog({
      message: 'Are you sure you want to delete this document?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => deleteDocument(id),
    })
  }

  useEffect(() => {
    if (user) fetchDocuments()
    else router.push('/login')
  }, [user, page, search])

  const onPageChange = (e: any) => {
    setPage(e.page)
  }

  const handleCreate = () => {
    router.push('/documents/create')
  }

  if (!user) return null

  return (
    <div className="document-list-container">
      <Toast ref={toast} />
      <ConfirmDialog />

      <div className="top-bar">
        <h2>Your Documents</h2>
        <Button label="New Document" icon="pi pi-plus" onClick={handleCreate} />
      </div>

      <span className="p-input-icon-left search-box">
        <i className="pi pi-search" />
        <InputText
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </span>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="document-list">
          {documents?.map((doc) => (
            <Card
              key={doc.id}
              title={doc.title}
              subTitle={`Tags: ${doc.tags.join(', ')}`}
              className="doc-card"
            >
              <p>{doc.description.slice(0, 100)}...</p>
              <small>Created: {new Date(doc.createdAt).toLocaleString()}</small>
              <div className="mt-3 flex justify-between">
                <Button
                  label="View"
                  icon="pi pi-eye"
                  className="p-button-text p-button-sm"
                  onClick={() => router.push(`/documents/${doc.id}`)}
                />
                <Button
                  label="Delete"
                  icon="pi pi-trash"
                  className="p-button-danger p-button-sm"
                  onClick={() => confirmDelete(doc.id)}
                />
              </div>
            </Card>
          ))}
        </div>
      )}

      <Paginator
        first={page * limit}
        rows={limit}
        totalRecords={total}
        onPageChange={onPageChange}
        className="paginator"
      />
    </div>
  )
}

export default DocumentListPage
