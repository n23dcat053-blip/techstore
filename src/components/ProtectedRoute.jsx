import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

// Chưa đăng nhập -> /login (đăng nhập xong quay lại trang đang muốn vào)
// Đã đăng nhập nhưng không phải Admin (khi adminOnly) -> về trang chủ
export default function ProtectedRoute({ adminOnly = false }) {
  const { isAuthenticated, isAdmin } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />
  return <Outlet />
}
