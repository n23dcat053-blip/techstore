import { Link } from 'react-router-dom'

const stats = [
  { value: '10+', label: 'Năm kinh nghiệm' },
  { value: '50.000+', label: 'Khách hàng tin dùng' },
  { value: '20', label: 'Cửa hàng toàn quốc' },
  { value: '98%', label: 'Khách hàng hài lòng' },
]

export default function AboutUs() {
  return (
    <div className="container page">
      <h1 className="page-title">Giới thiệu về TechStore</h1>

      <div className="about-grid">
        <div className="about-text">
          <p>
            TechStore là hệ thống bán lẻ thiết bị điện tử với sứ mệnh mang công nghệ chính
            hãng đến gần hơn với mọi người. Chúng tôi cung cấp điện thoại, laptop, tai nghe,
            đồng hồ thông minh và phụ kiện từ các thương hiệu hàng đầu.
          </p>
          <p>
            Với đội ngũ tư vấn tận tâm, chính sách bảo hành rõ ràng và giá cả cạnh tranh,
            TechStore cam kết mang lại trải nghiệm mua sắm an tâm, nhanh chóng và tiện lợi.
          </p>
          <h3>Giá trị cốt lõi</h3>
          <ul className="spec-list">
            <li>Chính hãng – minh bạch nguồn gốc</li>
            <li>Giá tốt – nhiều ưu đãi mỗi ngày</li>
            <li>Tận tâm – hỗ trợ sau bán hàng 24/7</li>
          </ul>
          <Link to="/contact" className="btn btn-primary">Liên hệ với chúng tôi</Link>
        </div>
        <div className="about-art" aria-hidden="true">🏬</div>
      </div>

      <div className="stats">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
