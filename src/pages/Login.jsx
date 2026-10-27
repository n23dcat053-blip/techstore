import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { isAuthenticated, isAdmin, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from

  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) return <Navigate to={from || (isAdmin ? '/admin/products' : '/')} replace />

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await login(form.username, form.password)
      navigate(from || (res.role === 'Admin' ? '/admin/products' : '/'), { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container page">
      <form className="contact-form login-form" onSubmit={onSubmit}>
        <h1 className="page-title">Đăng nhập</h1>
        {error && <div className="alert alert-error">{error}</div>}
        <label>
          Tên đăng nhập
          <input name="username" value={form.username} onChange={onChange} autoFocus required />
        </label>
        <label>
          Mật khẩu
          <input type="password" name="password" value={form.password} onChange={onChange} required />
        </label>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
        <p className="form-note">
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </p>
      </form>
    </div>
  )
}
