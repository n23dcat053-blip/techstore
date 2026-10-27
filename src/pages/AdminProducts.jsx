import { useState } from 'react'
import Status from '../components/Status.jsx'
import useFetch from '../hooks/useFetch.js'
import productApi from '../api/productApi.js'
import categoryApi from '../api/categoryApi.js'
import { formatPrice } from '../utils/format.js'

const emptyForm = {
  name: '',
  icon: '📦',
  price: '',
  oldPrice: '',
  rating: 4.5,
  badge: '',
  description: '',
  specs: '', // mỗi dòng 1 thông số
  categoryId: '',
}

// Trang quản trị: minh họa đủ 4 phương thức GET / POST / PUT / DELETE bằng Axios
export default function AdminProducts() {
  const prods = useFetch(() => productApi.getAll(), [])
  const cats = useFetch(() => categoryApi.getAll(), [])

  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [saving, setSaving] = useState(false)

  const categories = cats.data || []
  const list = prods.data || []

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const toRequest = () => ({
    name: form.name,
    icon: form.icon,
    price: Number(form.price),
    oldPrice: Number(form.oldPrice || form.price),
    rating: Number(form.rating),
    badge: form.badge,
    description: form.description,
    specs: form.specs.split('\n').map((s) => s.trim()).filter(Boolean),
    categoryId: Number(form.categoryId),
  })

  // POST (thêm mới) hoặc PUT (cập nhật)
  const onSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })
    try {
      if (editingId) {
        await productApi.update(editingId, toRequest())
        setMessage({ type: 'ok', text: 'Cập nhật sản phẩm thành công.' })
      } else {
        await productApi.create(toRequest())
        setMessage({ type: 'ok', text: 'Thêm sản phẩm thành công.' })
      }
      resetForm()
      prods.reload()
    } catch (err) {
      setMessage({ type: 'err', text: err.message })
    } finally {
      setSaving(false)
    }
  }

  const onEdit = (p) => {
    setEditingId(p.id)
    setForm({
      name: p.name,
      icon: p.icon,
      price: p.price,
      oldPrice: p.oldPrice,
      rating: p.rating,
      badge: p.badge,
      description: p.description,
      specs: p.specs.join('\n'),
      categoryId: p.categoryId,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // DELETE
  const onDelete = async (p) => {
    if (!window.confirm(`Xóa sản phẩm "${p.name}"?`)) return
    try {
      await productApi.remove(p.id)
      setMessage({ type: 'ok', text: 'Đã xóa sản phẩm.' })
      if (editingId === p.id) resetForm()
      prods.reload()
    } catch (err) {
      setMessage({ type: 'err', text: err.message })
    }
  }

  return (
    <div className="container page">
      <h1 className="page-title">Quản lý sản phẩm</h1>

      {message.text && (
        <div className={message.type === 'ok' ? 'alert' : 'alert alert-error'}>{message.text}</div>
      )}

      <form className="contact-form admin-form" onSubmit={onSubmit}>
        <h3>{editingId ? `Sửa sản phẩm #${editingId}` : 'Thêm sản phẩm mới'}</h3>

        <div className="form-row">
          <label>
            Tên sản phẩm
            <input name="name" value={form.name} onChange={onChange} required />
          </label>
          <label>
            Danh mục
            <select name="categoryId" value={form.categoryId} onChange={onChange} required>
              <option value="">-- Chọn danh mục --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-row">
          <label>
            Giá bán (₫)
            <input type="number" min="0" name="price" value={form.price} onChange={onChange} required />
          </label>
          <label>
            Giá gốc (₫)
            <input type="number" min="0" name="oldPrice" value={form.oldPrice} onChange={onChange} />
          </label>
          <label>
            Đánh giá (0-5)
            <input type="number" min="0" max="5" step="0.1" name="rating" value={form.rating} onChange={onChange} />
          </label>
        </div>

        <div className="form-row">
          <label>
            Icon (emoji)
            <input name="icon" value={form.icon} onChange={onChange} maxLength={10} />
          </label>
          <label>
            Nhãn (badge)
            <input name="badge" value={form.badge} onChange={onChange} placeholder="Mới, Hot, Giảm 10%..." />
          </label>
        </div>

        <label>
          Mô tả
          <textarea name="description" rows="3" value={form.description} onChange={onChange} />
        </label>
        <label>
          Thông số (mỗi dòng một mục)
          <textarea name="specs" rows="4" value={form.specs} onChange={onChange} />
        </label>

        <div className="form-actions">
          <button className="btn btn-primary" type="submit" disabled={saving}>
            {saving ? 'Đang lưu...' : editingId ? 'Cập nhật' : 'Thêm mới'}
          </button>
          {editingId && (
            <button className="btn btn-dark" type="button" onClick={resetForm}>Hủy sửa</button>
          )}
        </div>
      </form>

      <h2 className="section-title" style={{ marginTop: 32 }}>Danh sách ({list.length})</h2>
      <Status loading={prods.loading} error={prods.error} onRetry={prods.reload} />

      {!prods.loading && !prods.error && (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Sản phẩm</th>
                <th>Danh mục</th>
                <th>Giá</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.icon} {p.name}</td>
                  <td>{p.categoryName}</td>
                  <td>{formatPrice(p.price)}</td>
                  <td className="table-actions">
                    <button className="btn-sm btn-edit" type="button" onClick={() => onEdit(p)}>Sửa</button>
                    <button className="btn-sm btn-del" type="button" onClick={() => onDelete(p)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
