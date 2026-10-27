import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="container page">
      <h1 className="page-title">Liên hệ</h1>

      <div className="contact-grid">
        <div className="contact-info">
          <h3>Thông tin cửa hàng</h3>
          <p>📍 97 Man Thiện, TP. Thủ Đức, TP.HCM</p>
          <p>☎ Hotline: 1900 1234</p>
          <p>✉ support@techstore.vn</p>
          <p>🕘 8:00 – 21:00 (Thứ 2 – Chủ nhật)</p>
        </div>

        <form className="contact-form" onSubmit={onSubmit}>
          {sent && <div className="alert">Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm nhất.</div>}
          <label>
            Họ và tên
            <input name="name" value={form.name} onChange={onChange} required />
          </label>
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={onChange} required />
          </label>
          <label>
            Nội dung
            <textarea name="message" rows="5" value={form.message} onChange={onChange} required />
          </label>
          <button className="btn btn-primary" type="submit">Gửi liên hệ</button>
        </form>
      </div>
    </div>
  )
}
