'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { useAuth } from '../../../../context/AuthContext'

const CreateDocumentPage = () => {
    const { user } = useAuth()
    const router = useRouter()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            const token = localStorage.getItem('token')
            const res = await axios.post(
                'http://localhost:4000/api/documents',
                { title, description, tags },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            router.push(`/dashboard`)
        } catch (err) {
            console.error('Error creating document', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!user) router.push('/login')
    }, [user])

    if (!user) return null

    return (
        <div className="create-document-container">
            <h2>Create Document</h2>
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

                <Button label="Create Document" icon="pi pi-plus" type="submit" loading={loading} />
            </form>
        </div>
    )
}

export default CreateDocumentPage
