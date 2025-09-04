# ✈️ Travel Articles

A modern travel article management web app built with **React (Vite)**, **Tailwind CSS**, **Redux Toolkit**, and **@tanstack/react-query**, connected to a **Strapi API**.  
This app allows users to **register & login**, manage **travel articles & categories**, and explore data with **pagination, modals, and image uploads**.

---

## 🚀 Live Demo

👉 [Deployment Link](https://your-demo-link.netlify.app)

---

## ⚒️ Setup Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/travel-articles-app.git
cd travel-articles-app
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

3. **Set environment variables**  
   Create a `.env` file in the root folder:

```env
VITE_API_URL=https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api
```

4. **Run development server:**

```bash
npm run dev
# or
yarn dev
```

5. Open `http://localhost:5173` in your browser.

---

## ✅ Features Implemented

- 👤 **Authentication** (Register & Login) with JWT
- 🔒 **Protected routes** using `ProtectedRoute`
- 📦 **State management** with Redux Toolkit (`authSlice`)
- 📡 **Data fetching & caching** with `@tanstack/react-query`
- 📚 **Travel articles CRUD** (Create, Read, Update, Delete)
- 🗂️ **Category management** with modal selection
- 📑 **Pagination** (with custom `Pagination` component)
- 📸 **Image upload** via Strapi `/upload` endpoint (with preview + drag & drop support)
- 🧾 **Reusable hooks** (`useTripArticles`, `useSaveArticle`, `useDeleteArticle`, etc.)
- 🖼️ **Responsive UI** styled with Tailwind CSS

---

## 💡 Technical Decisions

- **React + Vite** chosen for fast dev environment and modern DX.
- **Tailwind CSS** for utility-first, responsive styling.
- **Redux Toolkit** for authentication state persistence (`loadFromStorage`, `setAuth`, `logout`).
- **React Query** for managing server state (fetch, cache, invalidate queries).
- **Strapi API** as backend (articles, categories, auth, upload).
- **Reusable hooks** for data fetching and mutations → makes components clean and focused.
- **Modal-based CRUD** UI pattern for Articles and Categories.
- **Custom Pagination component** for page navigation with condensed page numbers (`...` style).

---

## 📬 Contact

- 📧 Email: hellowawansetiawan@gmail.com
- 💬 WhatsApp: +62 877-3269-7337
- 💼 LinkedIn: [linkedin.com/in/wawan-setiawan](https://www.linkedin.com/in/wawan-setiawan-84934a206/)
