import { Link } from 'react-router-dom'
import logo from '../../public/logo.png'

export default function Logo({ label = true }: { label?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-4 z-10">
      <img src={logo} alt="logo-travel" width="90" height="90" />
      {label && <span className="text-xl font-semibold ">DatacakraTrip</span>}
    </Link>
  )
}
