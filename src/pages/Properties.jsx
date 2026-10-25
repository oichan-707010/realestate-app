import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { deleteProperty, fetchProperties } from '../lib/properties'

// 物件一覧画面（ログイン必須）
export default function Properties() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [properties, setProperties] = useState(null)
  const [error, setError] = useState('')

  // 物件一覧を読み込む
  useEffect(() => {
    fetchProperties()
      .then(setProperties)
      .catch((err) => setError(`物件の取得に失敗しました：${err.message}`))
  }, [])

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  const handleDelete = async (property) => {
    if (!window.confirm(`「${property.name}」を削除しますか？`)) return
    try {
      await deleteProperty(property.id)
      setProperties((prev) => prev.filter((p) => p.id !== property.id))
    } catch (err) {
      setError(`削除に失敗しました：${err.message}`)
    }
  }

  return (
    <div className="properties-page">
      <header className="header">
        <h1>物件一覧</h1>
        <div className="header-right">
          <span className="user-email">{user.email}</span>
          <button onClick={handleLogout} className="logout-button">
            ログアウト
          </button>
        </div>
      </header>

      <div className="toolbar">
        <Link to="/properties/new" className="button-link">
          ＋ 新規登録
        </Link>
      </div>

      {error && <p className="error">{error}</p>}
      {!error && !properties && <p>読み込み中...</p>}
      {properties?.length === 0 && <p className="empty">登録された物件はまだありません。</p>}

      <div className="property-grid">
        {properties?.map((property) => (
          <div key={property.id} className="property-card">
            <h2>{property.name}</h2>
            <p className="rent">家賃：{property.rent.toLocaleString()}円/月</p>
            <p className="area">エリア：{property.area}</p>
            <p className="layout">間取り：{property.layout}</p>
            <div className="card-actions">
              <Link to={`/properties/${property.id}/edit`} className="button-link small">
                編集
              </Link>
              <button onClick={() => handleDelete(property)} className="delete-button small">
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
