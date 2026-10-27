import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/format.js'

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      {product.badge && <span className="badge">{product.badge}</span>}
      <Link to={`/products/${product.id}`} className="product-thumb">
        <span>{product.icon}</span>
      </Link>
      <div className="product-body">
        <h3 className="product-name">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="rating">★ {product.rating}</div>
        <div className="price-row">
          <span className="price">{formatPrice(product.price)}</span>
          <span className="old-price">{formatPrice(product.oldPrice)}</span>
        </div>
        <button className="btn btn-primary btn-block" type="button">
          Thêm vào giỏ
        </button>
      </div>
    </article>
  )
}
