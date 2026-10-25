import { useNavigate } from 'react-router-dom'
import PropertyForm from '../components/PropertyForm'
import { createProperty } from '../lib/properties'

// 物件の新規登録画面
export default function PropertyNew() {
  const navigate = useNavigate()

  const handleSubmit = async (property) => {
    await createProperty(property)
    navigate('/properties')
  }

  return (
    <div className="auth-container">
      <h1>物件の新規登録</h1>
      <PropertyForm submitLabel="登録する" onSubmit={handleSubmit} />
    </div>
  )
}
