import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const { isAuthenticated, register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ fullName: '', username: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) return <Navigate to="/" replace />

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) {
      setError('Mật khẩu nhập lại không khớp.')
      return
    }
    setLoading(true)
    try {
      await register({ fullName: form.fullName, username: form.username, password: form.password })
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container page">
      <form className="contact-form login-form" onSubmit={onSubmit}>
        <h1 className="page-title">Đăng ký tài khoản</h1>
        {error && <div className="alert alert-error">{error}</div>}
        <label>
          Họ và tên
          <input name="fullName" value={form.fullName} onChange={onChange} autoFocus required />
        </label>
        <label>
          Tên đăng nhập
          <input name="username" value={form.username} onChange={onChange} minLength={3} required />
        </label>
        <label>
          Mật khẩu (tối thiểu 6 ký tự)
          <input type="password" name="password" value={form.password} onChange={onChange} minLength={6} required />
        </label>
        <label>
          Nhập lại mật khẩu
          <input type="password" name="confirm" value={form.confirm} onChange={onChange} required />
        </label>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>
        <p className="form-note">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </form>
    </div>
  )
}
