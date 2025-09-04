import ArticleTravelTable from '../../features/dashboard/ArticleTravelTable'

export default function DashboardArticle() {
  return (
    <div className="py-2 px-8">
      <div className="border-b border-primary-800 pb-2">
        <h1 className="text-2xl font-bold mb-2">Article Travel Management</h1>
        <p>Here you can manage your articles.</p>
      </div>

      <ArticleTravelTable />
    </div>
  )
}
