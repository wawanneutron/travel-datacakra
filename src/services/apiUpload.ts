import type { UploadResponse } from '../types'

const BASE_API = import.meta.env.VITE_API_URL

export const uploadImage = async (
  file: File,
  token: string
): Promise<UploadResponse> => {
  const formData = new FormData()
  formData.append('files', file)

  const res = await fetch(`${BASE_API}/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  })

  if (!res.ok) throw new Error('Failed to upload image')

  const data: UploadResponse[] = await res.json()
  return data[0]
}
