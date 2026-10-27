import axiosClient from './axiosClient.js'

const productApi = {
  // GET /api/products?categoryId=&search=
  getAll: (params) => axiosClient.get('/products', { params }),

  // GET /api/products/:id
  getById: (id) => axiosClient.get(`/products/${id}`),

  // POST /api/products
  create: (data) => axiosClient.post('/products', data),

  // PUT /api/products/:id
  update: (id, data) => axiosClient.put(`/products/${id}`, data),

  // DELETE /api/products/:id
  remove: (id) => axiosClient.delete(`/products/${id}`),
}

export default productApi
