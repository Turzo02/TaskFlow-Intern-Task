# 🟢 TaskFlow Dashboard – Frontend Intern Task

A premium, architecturally designed task management dashboard built with **React**, **Tailwind CSS**, and **Axios**. This project features a robust JWT authentication system and a high-fidelity UI inspired by modern "TaskFlow" design aesthetics.

## 🚀 Live Demo

**[Vercel/Netlify Link Here]**

---

## ✨ Key Features

### 🔐 Authentication & Security (Bonus Task)

* **JWT Persistence:** Securely stores tokens in `localStorage` to maintain sessions across refreshes.
* **Route Guarding:** - `ProtectedRoute`: Prevents unauthorized access to the dashboard.
* `PublicRoute`: Redirects logged-in users away from the login page.


* **Axios Interceptors:** Automatically attaches the `Authorization: Bearer <token>` header to every outgoing API request.
* **Logout Logic:** Complete session clearing and secure redirection.

### 🎨 Design & UX

* **TaskFlow Aesthetic:** Implements extreme rounding (`40px`), deep forest green palettes (`#1B4332`), and a floating sidebar architecture.
* **Modern Typography:** High-contrast hierarchy using tight letter-spacing for an authoritative, premium feel.
* **Toast Notifications:** Real-time feedback via `react-hot-toast` for login success, errors, and unauthorized access attempts.
* **Demo Mode:** Pre-filled credentials on the login page for effortless reviewer testing.

### 📊 Functional Components

* **Dynamic Stats:** Metric cards showing Project Overview.
* **Data Visualization:** Architectural progress gauges and analytics charts.
* **Responsive Layout:** Fully fluid design that adapts from desktop to mobile.

---

## 🛠️ Tech Stack

* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS
* **Routing:** React Router v6
* **API Handling:** Axios (Custom Instance + Interceptors)
* **Forms:** React Hook Form
* **Notifications:** React Hot Toast
* **Icons:** Lucide React / HeroIcons

---

## 📂 Folder Structure

```bash
src/
├── components/   # Reusable UI (Cards, Gauges, Buttons)
├── layout/       # Sidebar & Dashboard Wrapper
├── pages/        # LoginPage & Dashboard View
├── routes/       # ProtectedRoute & PublicRoute Logic
├── service/      # Axios Instance (api.js)
├── App.jsx       # Routing Configuration
└── main.jsx      # App Entry & Global Providers

```

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/taskflow-dashboard.git

```


2. **Install dependencies:**
```bash
npm install

```


3. **Run the development server:**
```bash
npm run dev

```



---

## 📝 Credentials for Testing

* **Email:** `user1@example.com`
* **Password:** `password123`
*(Note: These are pre-filled on the login page for convenience.)*

