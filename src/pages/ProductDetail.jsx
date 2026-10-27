import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import Status from '../components/Status.jsx'
import useFetch from '../hooks/useFetch.js'
import productApi from '../api/productApi.js'
import { formatPrice } from '../utils/format.js'

export default function ProductDetail() {
  // Lấy id từ URL: /products/3
  const { id } = useParams()
  const { data: product, loading, error, reload } = useFetch(() => productApi.getById(id), [id])

  // Sản phẩm liên quan: cùng danh mục
  const related = useFetch(
    () => (product ? productApi.getAll({ categoryId: product.categoryId }) : Promise.resolve([])),
    [product?.categoryId],
  )

  if (loading || error) {
    return (
      <div className="container page center">
        <Status loading={loading} error={error} onRetry={reload} />
        {error && (
          <Link to="/products" className="btn btn-dark">← Quay lại danh sách</Link>
        )}
      </div>
    )
  }

  const relatedList = (related.data || []).filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <div className="container page">
      <div className="breadcrumb">
        <Link to="/">Trang chủ</Link> / <Link to="/products">Sản phẩm</Link> / {product.name}
      </div>

      <div className="detail">
        <div className="detail-image">{product.icon}</div>
        <div className="detail-info">
          <h1>{product.name}</h1>
          <div className="rating">★ {product.rating} / 5</div>
          <div className="price-row big">
            <span className="price">{formatPrice(product.price)}</span>
            <span className="old-price">{formatPrice(product.oldPrice)}</span>
          </div>
          <p>{product.description}</p>
          <ul className="spec-list">
            {product.specs.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <div className="detail-actions">
            <button className="btn btn-primary" type="button">Thêm vào giỏ</button>
            <button className="btn btn-dark" type="button">Mua ngay</button>
          </div>
        </div>
      </div>

      {relatedList.length > 0 && (
        <section className="section">
          <h2 className="section-title">Sản phẩm liên quan</h2>
          <div className="product-grid">
            {relatedList.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
