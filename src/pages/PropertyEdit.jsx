import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PropertyForm from '../components/PropertyForm'
import { fetchProperty, updateProperty } from '../lib/properties'

// 物件の編集画面
export default function PropertyEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [error, setError] = useState('')

  // 編集対象の物件を読み込む
  useEffect(() => {
    fetchProperty(id)
      .then(setProperty)
      .catch(() => setError('物件が見つかりませんでした。'))
  }, [id])

  const handleSubmit = async (values) => {
    await updateProperty(id, values)
    navigate('/properties')
  }

  return (
    <div className="auth-container">
      <h1>物件の編集</h1>
      {error && (
        <>
          <p className="error">{error}</p>
          <Link to="/properties">物件一覧へ戻る</Link>
        </>
      )}
      {!error && !property && <p>読み込み中...</p>}
      {property && (
        <PropertyForm initialValues={property} submitLabel="更新する" onSubmit={handleSubmit} />
      )}
    </div>
  )
}
