import { useEffect, useState } from 'react'
import api from '../services/api'

export default function Products() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const items = await api.products()
        setData(items)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <p className="p-6">Cargando…</p>
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map(p => (
          <article key={p._id} className="rounded-xl border bg-white p-4">
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.description}</p>
            <p className="mt-2 font-bold">${p.price}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

 console.log('API URL:', import.meta.env.VITE_API_URL)
