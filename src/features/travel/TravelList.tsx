import { useNavigate } from 'react-router-dom'
import CardTravel from './CardTravel'

function TravelList() {
  const travelData = [
    {
      id: 1,
      title: 'Pantai Kuta',
      description: 'Pantai ikonik di Bali dengan pasir putih dan sunset indah.',
      cover_image_url:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      createdAt: '2025-05-10T08:30:00.000Z'
    },
    {
      id: 2,
      title: 'Gunung Bromo',
      description:
        'Gunung berapi aktif dengan pemandangan sunrise yang memukau.',
      cover_image_url:
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
      createdAt: '2025-05-12T06:15:00.000Z'
    },
    {
      id: 3,
      title: 'Danau Toba',
      description:
        'Danau vulkanik terbesar di Asia Tenggara, dengan Pulau Samosir di tengahnya.',
      cover_image_url:
        'https://images.unsplash.com/photo-1589308078055-9153a28b8b34',
      createdAt: '2025-05-14T14:45:00.000Z'
    },
    {
      id: 4,
      title: 'Raja Ampat',
      description:
        'Surga bawah laut dengan terumbu karang dan biota laut beragam.',
      cover_image_url:
        'https://images.unsplash.com/photo-1526481280698-8fcc6b903a20',
      createdAt: '2025-05-15T10:20:00.000Z'
    },
    {
      id: 5,
      title: 'Candi Borobudur',
      description: 'Candi Buddha terbesar di dunia dengan relief yang megah.',
      cover_image_url:
        'https://images.unsplash.com/photo-1602067340370-3f03b0c803e4',
      createdAt: '2025-05-16T09:00:00.000Z'
    }
  ]

  const navigate = useNavigate()
  const onDetailTrip = () => navigate('/login')

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {travelData.map((travel) => (
        <CardTravel key={travel.id} trip={travel} detailTrip={onDetailTrip} />
      ))}
    </div>
  )
}

export default TravelList
