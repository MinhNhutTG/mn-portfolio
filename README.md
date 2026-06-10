# MN Portfolio

Portfolio cá nhân với nhân vật 3D xoay (React + Three.js), giao diện "VIP" gold/purple, và trang quản trị để thêm/sửa/xóa dự án.

## Cấu trúc dự án

```
MN-Portfolio/
├── client/   # React + Vite + Three.js (frontend)
└── server/   # Node.js + Express + JSON storage (backend API)
```

## Chạy dự án

### 1. Backend (server)

```bash
cd server
npm install
npm run dev      # hoặc: npm start
```

Server chạy tại `http://localhost:5000`.

Cấu hình trong `server/.env` (đã tạo sẵn từ `.env.example`):
- `ADMIN_PASSWORD` — mật khẩu đăng nhập trang quản trị (mặc định: `admin123`)
- `JWT_SECRET` — khóa bí mật để ký token đăng nhập
- `PORT` — cổng chạy server (mặc định: 5000)

**Quan trọng:** Đổi `ADMIN_PASSWORD` và `JWT_SECRET` trước khi deploy thật.

### 2. Frontend (client)

```bash
cd client
npm install
npm run dev
```

Mở `http://localhost:5173` (hoặc cổng được Vite hiển thị) trên trình duyệt.

Biến môi trường trong `client/.env`:
- `VITE_API_URL` — địa chỉ API backend (mặc định: `http://localhost:5000/api`)

## Tính năng

- **Hero 3D**: Nhân vật robot 3D phong cách vàng/tím, tự xoay + bồng bềnh, kéo chuột để xoay theo ý muốn.
- **Giới thiệu / Kỹ năng**: Thông tin cá nhân, số liệu thống kê, thanh kỹ năng — chỉnh sửa tại `client/src/data/profile.js`.
- **Dự án**: Lấy dữ liệu từ API `/api/projects`, hiển thị dạng card với ảnh, tag, link.
- **Liên hệ**: Form gửi email trực tiếp (mailto).
- **Trang quản trị** (`/admin`): Đăng nhập bằng mật khẩu, thêm/sửa/xóa dự án — lưu vào `server/data/projects.json`.

## Tùy chỉnh nội dung

- Thông tin cá nhân, kỹ năng, social links: `client/src/data/profile.js`
- Dự án mặc định: `server/data/projects.json` (hoặc thêm qua trang `/admin`)
- Màu sắc / theme: biến CSS trong `client/src/index.css`
- Nhân vật 3D: `client/src/three/Avatar.jsx` và `client/src/three/AvatarScene.jsx`

## Build production

```bash
cd client
npm run build
```

File build nằm trong `client/dist/`. Backend có thể deploy riêng (Render, Railway, VPS...) — nhớ cập nhật `VITE_API_URL` trỏ đến URL backend thật.
