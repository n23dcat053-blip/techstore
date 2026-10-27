import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import authApi from '../api/authApi.js'

const AuthContext = createContext(null)

const read = (key) => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}
const write = (key, value) => {
  try {
    if (value == null) localStorage.removeItem(key)
    else localStorage.setItem(key, value)
  } catch {
    /* bỏ qua nếu trình duyệt chặn localStorage */
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => read('token'))
  const [username, setUsername] = useState(() => read('username'))
  const [fullName, setFullName] = useState(() => read('fullName'))
  const [role, setRole] = useState(() => read('role'))

  const save = useCallback((res) => {
    write('token', res.token)
    write('username', res.username)
    write('fullName', res.fullName)
    write('role', res.role)
    setToken(res.token)
    setUsername(res.username)
    setFullName(res.fullName)
    setRole(res.role)
    return res
  }, [])

  const login = useCallback(async (user, password) => save(await authApi.login(user, password)), [save])
  const register = useCallback(async (data) => save(await authApi.register(data)), [save])

  const logout = useCallback(() => {
    ;['token', 'username', 'fullName', 'role'].forEach((k) => write(k, null))
    setToken(null)
    setUsername(null)
    setFullName(null)
    setRole(null)
  }, [])

  // axiosClient phát sự kiện này khi server trả 401 (token hết hạn / không hợp lệ)
  useEffect(() => {
    window.addEventListener('auth:logout', logout)
    return () => window.removeEventListener('auth:logout', logout)
  }, [logout])

  const value = useMemo(
    () => ({
      token,
      username,
      fullName,
      role,
      isAuthenticated: Boolean(token),
      isAdmin: role === 'Admin',
      login,
      register,
      logout,
    }),
    [token, username, fullName, role, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
