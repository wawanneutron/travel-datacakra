import type { CommentInputPayload } from '../types/comment'

const BASE_API = import.meta.env.VITE_API_URL

export const createUpdateComment = async (
  payload: CommentInputPayload,
  token: string,
  id?: string
) => {
  const method = id ? 'PUT' : 'POST'
  const url = id ? `${BASE_API}/comments/${id}` : `${BASE_API}/comments`

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ data: payload })
  })

  const json = await res.json()

  if (!res.ok)
    throw new Error(
      `Failed to ${id ? 'update' : 'create'} comment: ${json?.error?.message}`
    )

  return json
}

export const getCommentById = async (id: string, token: string) => {
  const res = await fetch(`${BASE_API}/comments/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error?.error?.message || 'Failed to fetch comment')
  }

  return res.json()
}
