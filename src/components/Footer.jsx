import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3 className="footer-logo">TechStore</h3>
          <p>Hệ thống bán lẻ thiết bị điện tử chính hãng, giá tốt, bảo hành uy tín.</p>
        </div>
        <div>
          <h4>Điều hướng</h4>
          <ul>
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/products">Sản phẩm</Link></li>
            <li><Link to="/about-us">Giới thiệu</Link></li>
            <li><Link to="/contact">Liên hệ</Link></li>
          </ul>
        </div>
        <div>
          <h4>Chính sách</h4>
          <ul>
            <li>Bảo hành 12 tháng</li>
            <li>Đổi trả trong 7 ngày</li>
            <li>Giao hàng nhanh 2h</li>
            <li>Thanh toán an toàn</li>
          </ul>
        </div>
        <div>
          <h4>Liên hệ</h4>
          <ul>
            <li>📍 97 Man Thiện, TP. Thủ Đức, TP.HCM</li>
            <li>☎ 1900 1234</li>
            <li>✉ support@techstore.vn</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">© 2026 TechStore. Đồ án môn học - Website bán hàng điện tử.</div>
    </footer>
  )
}
