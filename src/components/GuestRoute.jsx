import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// 未ログイン専用のページ（ログイン・会員登録）用
// ログイン済みなら物件一覧へリダイレクトする
export default function GuestRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <p className="loading">読み込み中...</p>
  if (user) return <Navigate to="/properties" replace />

  return children
}
