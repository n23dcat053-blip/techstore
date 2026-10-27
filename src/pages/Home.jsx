import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import Status from '../components/Status.jsx'
import useFetch from '../hooks/useFetch.js'
import productApi from '../api/productApi.js'
import categoryApi from '../api/categoryApi.js'

const features = [
  { icon: '✅', title: 'Hàng chính hãng', text: '100% sản phẩm có tem, hóa đơn đầy đủ' },
  { icon: '🚚', title: 'Giao hàng nhanh', text: 'Nhận hàng trong 2 giờ nội thành' },
  { icon: '🔄', title: 'Đổi trả 7 ngày', text: 'Lỗi do nhà sản xuất đổi mới ngay' },
  { icon: '🛡️', title: 'Bảo hành 12 tháng', text: 'Hỗ trợ kỹ thuật trọn đời sản phẩm' },
]

export default function Home() {
  const cats = useFetch(() => categoryApi.getAll(), [])
  const prods = useFetch(() => productApi.getAll(), [])
  const categories = cats.data || []
  const featured = (prods.data || []).slice(0, 8)

  return (
    <>
      {/* Banner */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <span className="hero-tag">Khuyến mãi mùa mua sắm 2026</span>
            <h1>Công nghệ đỉnh cao,<br />giá tốt mỗi ngày</h1>
            <p>
              Điện thoại, laptop, tai nghe và phụ kiện chính hãng. Giảm đến 25% cùng
              nhiều ưu đãi trả góp 0%.
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-light">Mua ngay</Link>
              <Link to="/about-us" className="btn btn-outline">Tìm hiểu thêm</Link>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <span className="art-1">📱</span>
            <span className="art-2">💻</span>
            <span className="art-3">🎧</span>
          </div>
        </div>
      </section>

      {/* Ưu điểm */}
      <section className="container features">
        {features.map((f) => (
          <div className="feature" key={f.title}>
            <span className="feature-icon">{f.icon}</span>
            <div>
              <h4>{f.title}</h4>
              <p>{f.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Danh mục */}
      <section className="container section">
        <h2 className="section-title">Danh mục nổi bật</h2>
        <Status loading={cats.loading} error={cats.error} onRetry={cats.reload} />
        <div className="category-grid">
          {categories.map((c) => (
            <Link to={`/products?categoryId=${c.id}`} className="category-card" key={c.id}>
              <span className="category-icon">{c.icon}</span>
              <span>{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Sản phẩm nổi bật */}
      <section className="container section">
        <div className="section-head">
          <h2 className="section-title">Sản phẩm nổi bật</h2>
          <Link to="/products" className="link-more">Xem tất cả →</Link>
        </div>
        <Status loading={prods.loading} error={prods.error} onRetry={prods.reload} />
        <div className="product-grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Đăng ký nhận tin */}
      <section className="newsletter">
        <div className="container newsletter-inner">
          <div>
            <h2>Nhận ưu đãi độc quyền</h2>
            <p>Đăng ký email để không bỏ lỡ khuyến mãi mới nhất.</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Nhập email của bạn" required />
            <button className="btn btn-primary" type="submit">Đăng ký</button>
          </form>
        </div>
      </section>
    </>
  )
}
