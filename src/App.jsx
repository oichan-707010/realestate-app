import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Properties from './pages/Properties'
import PropertyNew from './pages/PropertyNew'
import PropertyEdit from './pages/PropertyEdit'

// ルーティングの定義
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
          <Route path="/properties" element={<ProtectedRoute><Properties /></ProtectedRoute>} />
          <Route path="/properties/new" element={<ProtectedRoute><PropertyNew /></ProtectedRoute>} />
          <Route path="/properties/:id/edit" element={<ProtectedRoute><PropertyEdit /></ProtectedRoute>} />
          {/* それ以外のURLは物件一覧へ（未ログインならさらにログイン画面へ） */}
          <Route path="*" element={<Navigate to="/properties" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
