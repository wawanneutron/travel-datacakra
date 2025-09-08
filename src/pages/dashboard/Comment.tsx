import CommentArticleTable from '../../features/dashboard/CommnetArticleTable'

export default function DashboardComment() {
  return (
    <div className="py-2 px-8">
      <div className="border-b border-primary-800 pb-2">
        <h1 className="text-2xl font-bold mb-2">Comments Article Management</h1>
        <p>Here you can manage your comments.</p>
      </div>

      <CommentArticleTable />
    </div>
  )
}
