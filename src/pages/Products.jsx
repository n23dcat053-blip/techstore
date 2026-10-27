import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import Status from '../components/Status.jsx'
import useFetch from '../hooks/useFetch.js'
import productApi from '../api/productApi.js'
import categoryApi from '../api/categoryApi.js'

export default function Products() {
  // Lọc theo danh mục bằng query string: /products?categoryId=1
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('categoryId') || ''

  const cats = useFetch(() => categoryApi.getAll(), [])
  const prods = useFetch(
    () => productApi.getAll(categoryId ? { categoryId } : undefined),
    [categoryId],
  )

  const categories = cats.data || []
  const list = prods.data || []

  const selectCategory = (id) => {
    if (!id) setSearchParams({})
    else setSearchParams({ categoryId: id })
  }

  return (
    <div className="container page">
      <h1 className="page-title">Sản phẩm</h1>

      <div className="filters">
        <button
          type="button"
          className={`chip ${!categoryId ? 'chip-active' : ''}`}
          onClick={() => selectCategory('')}
        >
          Tất cả
        </button>
        {categories.map((c) => (
          <button
            type="button"
            key={c.id}
            className={`chip ${categoryId === String(c.id) ? 'chip-active' : ''}`}
            onClick={() => selectCategory(c.id)}
          >
            {c.icon} {c.name}
          </button>
        ))}
      </div>

      <Status loading={prods.loading} error={prods.error} onRetry={prods.reload} />

      {!prods.loading && !prods.error && (
        <>
          <p className="result-count">Hiển thị {list.length} sản phẩm</p>
          {list.length > 0 ? (
            <div className="product-grid">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <p className="empty">Chưa có sản phẩm trong danh mục này.</p>
          )}
        </>
      )}
    </div>
  )
}
