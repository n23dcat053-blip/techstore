// Hiển thị trạng thái đang tải / lỗi khi gọi API
export default function Status({ loading, error, onRetry }) {
  if (loading) return <p className="empty">Đang tải dữ liệu...</p>
  if (error)
    return (
      <div className="empty error-box">
        <p>⚠ {error}</p>
        {onRetry && (
          <button className="btn btn-primary" type="button" onClick={onRetry}>
            Thử lại
          </button>
        )}
      </div>
    )
  return null
}
