'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { InputTextarea } from 'primereact/inputtextarea'
import { useAuth } from '../../../../../context/AuthContext'

const EditDocumentPage = () => {
    const { user } = useAuth()
    const params = useParams()
    const router = useRouter()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    const fetchDocument = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.get(`http://localhost:4000/api/documents/${params.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            const { title, description, tags } = res.data
            setTitle(title)
            setDescription(description)
            setTags(tags)
        } catch (err) {
            console.error('Error fetching document', err)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            const token = localStorage.getItem('token')
            await axios.put(
                `http://localhost:4000/api/documents/${params.id}`,
                { title, description, tags },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            router.push(`/documents/${params.id}`)
        } catch (err) {
            console.error('Error updating document', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user) fetchDocument()
        else router.push('/login')
    }, [user])

    if (!user) return null

    return (
        <div className="edit-document-container">
            <h2>Edit Document</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <InputText value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <InputTextarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={5}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Tags (comma-separated)</label>
                    <InputText
                        value={tags.join(', ')}
                        onChange={(e) => setTags(e.target.value.split(',').map((t) => t.trim()))}
                    />
                </div>

                <Button label="Update Document" icon="pi pi-save" type="submit" loading={loading} />
            </form>
        </div>
    )
}

export default EditDocumentPage
