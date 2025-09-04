export function formatDate(dateString: string): string {
  if (!dateString) return ''

  return new Date(dateString).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}
