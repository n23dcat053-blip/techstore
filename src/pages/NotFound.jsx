import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container page center">
      <div className="nf-code">404</div>
      <h1 className="page-title">Không tìm thấy trang</h1>
      <p>Đường dẫn bạn truy cập không tồn tại hoặc đã bị thay đổi.</p>
      <Link to="/" className="btn btn-primary">← Về trang chủ</Link>
    </div>
  )
}
