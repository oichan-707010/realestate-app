import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { properties } from '../data/properties'

// 物件一覧画面（ログイン必須）
export default function Properties() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
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

      <div className="property-grid">
        {properties.map((property) => (
          <div key={property.id} className="property-card">
            <h2>{property.name}</h2>
            <p className="rent">家賃：{property.rent.toLocaleString()}円/月</p>
            <p className="area">エリア：{property.area}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
