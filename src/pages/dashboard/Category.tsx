import CategoryTravelTable from '../../features/dashboard/CategoryTravelTable'

export default function DashboardCategory() {
  return (
    <div className="py-2">
      <div className="border-b border-primary-800 pb-2">
        <h1 className="text-2xl font-bold mb-2">Category Article Management</h1>
        <p>Here you can manage your categories.</p>
      </div>

      <CategoryTravelTable />
    </div>
  )
}
