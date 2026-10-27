import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // chạy ở http://localhost:3000
    open: true,
    // Không theo dõi thư mục backend (dotnet ghi file liên tục -> gây lỗi EBUSY)
    watch: {
      ignored: ['**/backend/**', '**/node_modules/**'],
    },
  },
})
