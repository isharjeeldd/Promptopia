'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@components/Form'
import { useState, useEffect } from 'react'

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    const getPromptsDetails = async () => {
        const res = await fetch(`/api/prompt/${promptId}`)
        const data = await res.json();
        setPost({
            prompt: data.prompt,
            tag: data.tag
        })
    }

    useEffect(() => {
        if (promptId) getPromptsDetails
    }, [promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) {
            return alert('Prompt Id not found!')
        }
        try {
            const res = await fetch(`/api/prompt/${promptId}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify({
                        prompt: post.prompt,
                        tag: post.tag,
                    })
                });
            if (res.ok) {
                router.push('/')
            }

        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div>
            <Form
                type="Edit"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={() => updatePrompt}
            />
        </div>
    )
}

export default EditPrompt