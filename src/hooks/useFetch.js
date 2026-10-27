import { useCallback, useEffect, useState } from 'react'

// Hook gọi API: trả về { data, loading, error, reload }
export default function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const load = useCallback(fetcher, deps)

  const run = useCallback(() => {
    let cancelled = false
    setLoading(true)
    setError('')
    load()
      .then((res) => !cancelled && setData(res))
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [load])

  useEffect(() => run(), [run])

  return { data, loading, error, reload: run }
}
