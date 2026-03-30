# Vue Post Management — Quản lý bài viết
---

## Công nghệ sử dụng

| Thành phần | Vai trò |
|------------|---------|
| **Vue 3** (`<script setup>`) | UI và logic component |
| **Vue Router** | Điều hướng, route có tham số (`/posts/:id`, …) |
| **Vite** | Dev server và build |
| **Axios** | Gọi REST API Supabase (`/Post` — bảng post) |
| **@supabase/supabase-js** | Đăng nhập, đăng ký, session, đăng xuất |

---

## Tính năng chính

### 1. Trang chủ (`/`)

- Lời chào và nút dẫn tới danh sách bài viết.

### 2. Xác thực (`/auth`) — route công khai

- **Đăng nhập** bằng email/mật khẩu (`signInWithPassword`).
- **Đăng ký** (`signUp`); có thông báo kiểm tra email xác nhận tùy cấu hình Supabase.
- Sau khi đăng nhập thành công, chuyển hướng tới `/posts`.

### 3. Bảo vệ route (navigation guard)

- Các route **không** đánh dấu `meta.isPublic` yêu cầu **đã đăng nhập** (có session Supabase).
- Nếu chưa đăng nhập → chuyển tới `/auth`.
- Nếu đã đăng nhập mà vào `/auth` → chuyển tới `/posts`.

### 4. Thanh điều hướng toàn cục (`App.vue`)

- Hiển thị **email** người dùng khi đã đăng nhập.
- **Đăng xuất** (`signOut`) và quay lại `/auth`.
- Khi chưa đăng nhập: liên kết **Login** tới `/auth`.

### 5. Danh sách bài viết (`/posts`)

- Tải toàn bộ bài từ API (`GET /Post`).
- **Sắp xếp** theo cột **Title** hoặc **Detail Post (description)** — click header để đổi tăng/giảm (mũi tên ▲/▼).
- **Phân trang** cố định **5 bài/trang**, nút Prev/Next và hiển thị `Page x / y`.
- Nút **Add Post** → `/posts/add`.
- Mỗi dòng: **xem** (O), **sửa** (/), **xóa** (X) với xác nhận trước khi xóa.

### 6. Xem chi tiết (`/posts/:id`)

- `GET` bài theo `id` (filter `id=eq.{id}`).
- Hiển thị tiêu đề và mô tả; trạng thái loading khi chưa có dữ liệu.
- Nút quay lại danh sách.

### 7. Thêm bài (`/posts/add`)

- Form: tiêu đề, mô tả.
- `POST /Post` tạo bản ghi mới; thông báo thành công và điều hướng về `/posts`.

### 8. Sửa bài (`/posts/edit/:id`)

- Khi mở trang: `GET` bài theo id và điền form.
- `PUT` cập nhật bài; sau đó về `/posts`.

---

## Cấu trúc mã nguồn (rút gọn)

```
src/
  App.vue              # Nav, user, logout, <RouterView />
  main.js              # Khởi tạo app + router
  router/index.js      # Định nghĩa route + beforeEach (auth)
  pages/Home.vue       # Trang chủ
  components/
    Auth.vue           # Đăng nhập / đăng ký
    Posts.vue          # Danh sách, sort, phân trang
    Post.vue           # Một dòng bảng + xóa
    PostsView.vue      # Chi tiết
    PostsAdd.vue       # Tạo mới
    PostsEdit.vue      # Cập nhật
  lib/
    supabase.js        # Client Supabase (URL + anon key từ biến môi trường)
    axios.js           # Axios instance gọi Supabase REST `/Post`
  assets/main.css      # Style chung
```

---

## Chạy dự án

**Yêu cầu:** Node.js, tài khoản Supabase với bảng tương thích (ví dụ tên resource `Post` với các trường như `id`, `title`, `description`) và Auth bật.

1. Cài dependency:

```bash
npm install
```

2. Tạo file `.env` ở thư mục gốc (tham chiếu `src/lib/supabase.js`):

- `VITE_SUPABASE_URL` — URL dự án Supabase  
- `VITE_SUPABASE_ANON_KEY` — khóa anon (public)

3. Cấu hình **axios** (`src/lib/axios.js`) trùng **URL** và **apikey** (hoặc Authorization) với REST Supabase để các request `GET/POST/PUT/DELETE` tới `/Post` được phép bởi RLS/policy của bạn.

4. Chạy dev:

```bash
npm run dev
```

5. Build production:

```bash
npm run build
```

---

## Bảng route

| Đường dẫn | Mô tả |
|-----------|--------|
| `/` | Trang chủ |
| `/auth` | Đăng nhập / đăng ký (public) |
| `/posts` | Danh sách + sort + phân trang |
| `/posts/add` | Thêm bài |
| `/posts/:id` | Xem chi tiết |
| `/posts/edit/:id` | Sửa bài |

---
