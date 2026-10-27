# TechStore – Website bán hàng điện tử

Đồ án cuối môn: website bán thiết bị điện tử.

- **Front-end:** ReactJS (Vite), React Router, Axios
- **Back-end:** ASP.NET Core 8 Web API, Entity Framework Core 8
- **Database:** SQLite (file `techstore.db`, không cần cài server). Có thể đổi sang SQL Server, xem cuối file.

## Cài đặt (làm 1 lần)

Cần cài sẵn: [Node.js 18+](https://nodejs.org) và [.NET SDK 8](https://dotnet.microsoft.com/download).
Sau khi cài .NET, đóng và mở lại terminal / VS Code.

```bash
npm install
dotnet tool install --global dotnet-ef     # chỉ cần khi muốn tạo migration
```

## Chạy project

**Cách 1 – chạy cả hai bằng 1 lệnh (thư mục gốc):**

```bash
npm run dev:all
```

**Cách 2 – chạy riêng hai terminal:**

```bash
npm run api      # terminal 1: backend  -> http://localhost:5000/swagger
npm run dev      # terminal 2: frontend -> http://localhost:3000
```

Lần chạy đầu tiên, backend tự tạo file `techstore.db` với 6 danh mục và 12 sản phẩm mẫu.

## Các route (React Router)

| URL | Trang |
| --- | --- |
| `/` | Trang chủ |
| `/products` | Danh sách sản phẩm (lọc theo `?categoryId=1`) |
| `/products/:id` | Chi tiết sản phẩm |
| `/about-us` | Giới thiệu |
| `/contact` | Liên hệ |
| `/login`, `/register` | Đăng nhập, Đăng ký |
| `/admin/products` | Quản lý sản phẩm (thêm / sửa / xóa) – **chỉ tài khoản Admin** |
| `*` | Trang 404 |

Route khai báo ở `src/App.jsx`, `BrowserRouter` ở `src/main.jsx`, menu dùng `NavLink` ở `src/components/Header.jsx`.
Click menu hoặc gõ thẳng URL (ví dụ `http://localhost:3000/about-us`) đều ra đúng trang.

## API (ASP.NET Core)

Thư mục `backend/TechStore.Api`.

| Method | URL | Chức năng |
| --- | --- | --- |
| POST | `/api/auth/register` | Đăng ký tài khoản, nhận JWT |
| POST | `/api/auth/login` | Đăng nhập, nhận JWT |
| GET | `/api/products?categoryId=&search=` | Danh sách sản phẩm |
| GET | `/api/products/{id}` | Chi tiết sản phẩm |
| POST 🔒 | `/api/products` | Thêm sản phẩm |
| PUT 🔒 | `/api/products/{id}` | Cập nhật sản phẩm |
| DELETE 🔒 | `/api/products/{id}` | Xóa sản phẩm |
| GET / POST 🔒 / PUT 🔒 / DELETE 🔒 | `/api/categories`, `/api/categories/{id}` | Quản lý danh mục |

🔒 = cần vai trò Admin (header `Authorization: Bearer <token>`).

Body mẫu cho POST / PUT `/api/products`:

```json
{
  "name": "Chuột không dây M1",
  "icon": "🖱️",
  "price": 350000,
  "oldPrice": 450000,
  "rating": 4.5,
  "badge": "Mới",
  "description": "Chuột không dây yên tĩnh",
  "specs": ["Bluetooth 5.0", "Pin 12 tháng"],
  "categoryId": 6
}
```

Các file chính:

- `Controllers/` – `ProductsController`, `CategoriesController`
- `Models/` – `Product`, `Category`
- `Dtos/` – dữ liệu request / response và kiểm tra hợp lệ
- `Data/AppDbContext.cs` – DbContext của EF Core; `Data/SeedData.cs` – dữ liệu mẫu
- `Program.cs` – đăng ký DbContext, CORS cho `localhost:3000`, Swagger

## Tài khoản, đăng ký, đăng nhập (JWT)

- Bảng `Users` trong database lưu tài khoản (mật khẩu được băm PBKDF2, không lưu mật khẩu thật). Có 2 vai trò: `Admin` và `User`.
- **Đăng ký:** `http://localhost:3000/register` tạo tài khoản khách hàng (vai trò `User`) và tự đăng nhập.
- **Đăng nhập:** `http://localhost:3000/login`.
- **Tài khoản Admin mặc định:** `admin` / `Admin@123` (đổi trong `appsettings.json`, mục `AdminAccount`; được tạo tự động khi backend khởi động nếu chưa có).
- Menu "Quản trị" chỉ hiện với Admin. `User` thường vào `/admin/products` sẽ bị đưa về trang chủ, chưa đăng nhập thì bị chuyển sang `/login`.
- Backend: `POST /api/auth/register`, `POST /api/auth/login` trả về JWT; POST / PUT / DELETE của `products` và `categories` yêu cầu vai trò `Admin`, còn GET công khai.
- Front-end: `src/context/AuthContext.jsx` lưu token và vai trò, `src/components/ProtectedRoute.jsx` chặn route, `axiosClient` tự gắn header `Authorization: Bearer <token>`.
- Thử trong Swagger: gọi `/api/auth/login`, copy `token`, bấm nút **Authorize** rồi dán token.
- Nếu database cũ chưa có bảng `Users`, backend sẽ tự tạo lại database mẫu khi khởi động (chỉ ở môi trường Development, không dùng migration).

## Front-end gọi API bằng Axios

- `src/api/axiosClient.js` – instance Axios (baseURL lấy từ `.env`, biến `VITE_API_URL`, mặc định `http://localhost:5000/api`)
- `src/api/productApi.js`, `src/api/categoryApi.js` – các hàm GET / POST / PUT / DELETE
- `src/hooks/useFetch.js` – hook gọi API (loading, error, reload)
- `src/pages/AdminProducts.jsx` – form thêm (POST), sửa (PUT), xóa (DELETE) sản phẩm

## Cấu hình database và EF Core migration

**Kết nối database:** chuỗi kết nối ở `backend/TechStore.Api/appsettings.json`:

```json
"ConnectionStrings": { "DefaultConnection": "Data Source=techstore.db" }
```

`Program.cs` đăng ký: `AddDbContext<AppDbContext>(o => o.UseSqlite(...))`.

**Mặc định** project tự tạo database khi chạy (không cần migration). Để thực hành **migration** của EF Core:

```bash
cd backend/TechStore.Api
# xóa database cũ nếu đã chạy trước đó
del techstore.db            # Windows (PowerShell: Remove-Item techstore.db)
dotnet restore
dotnet ef migrations add InitialCreate
dotnet ef database update
```

Từ khi có thư mục `Migrations/`, `Program.cs` tự dùng `Migrate()` thay cho tạo trực tiếp.
Khi sửa model: `dotnet ef migrations add TenThayDoi` rồi `dotnet ef database update`.

### Đổi sang SQL Server (nếu giảng viên yêu cầu)

1. Trong `TechStore.Api.csproj` đổi package `Microsoft.EntityFrameworkCore.Sqlite` thành `Microsoft.EntityFrameworkCore.SqlServer` (cùng phiên bản).
2. `Program.cs`: `UseSqlite` → `UseSqlServer`.
3. `appsettings.json`:
   `"Server=localhost\\SQLEXPRESS;Database=TechStoreDb;Trusted_Connection=True;TrustServerCertificate=True"`
4. Xóa thư mục `Migrations/` (nếu có), rồi chạy `dotnet ef migrations add InitialCreate` và `dotnet ef database update`.

## Cấu trúc thư mục

```
techstore/
├── index.html, vite.config.js, package.json
├── public/favicon.svg
├── backend/TechStore.Api/        # ASP.NET Core Web API
└── src/
    ├── main.jsx                  # điểm vào, bọc BrowserRouter
    ├── App.jsx                   # khai báo routes
    ├── index.css                 # CSS toàn bộ giao diện
    ├── api/                      # axiosClient, productApi, categoryApi
    ├── hooks/useFetch.js
    ├── utils/format.js
    ├── layouts/MainLayout.jsx
    ├── components/               # Header, Footer, ProductCard, Status
    └── pages/                    # Home, Products, ProductDetail, AboutUs, Contact, AdminProducts, NotFound
```

## Đưa code lên GitHub

1. Đăng ký tài khoản tại https://github.com, tạo repository mới (ví dụ `techstore`), **không** tick thêm README.
2. Chạy ở thư mục gốc project:

```bash
git init
git add .
git commit -m "Khởi tạo project TechStore"
git branch -M main
git remote add origin https://github.com/<ten-tai-khoan>/techstore.git
git push -u origin main
```

`.gitignore` đã loại `node_modules`, `bin`, `obj`, `*.db` và `.env`.
