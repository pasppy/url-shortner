# 🔗 Shrtnr — Smart URL Shortener with Analytics

A modern, production-ready URL shortener built with a focus on **performance, analytics, and clean architecture**.
Generate short links, track clicks in real time, and understand user behavior with device and location insights.

---

## 🚀 Features

### 🔹 Core Functionality

* Shorten long URLs instantly
* Unique, shareable short links
* Automatic redirection

### 📊 Analytics System

* Track total clicks
* Device detection (mobile / desktop)
* Location tracking (city + country)
* Real-time data storage

### ⚡ Performance & Reliability

* Non-blocking redirects (fast UX)
* Backend-based tracking (no rate limits)
* Production-safe architecture

### 🔐 Authentication

* Secure login & signup
* Protected actions (create/manage links)

---

## 🛠 Tech Stack

* **Frontend:** Next.js
* **Backend / DB:** Supabase
* **Styling:** Tailwind CSS
* **Deployment:** Vercel

---

## 🧠 Architecture Overview

```text
User clicks short URL
        ↓
Frontend loads redirect page
        ↓
API route logs analytics (device + geo)
        ↓
User is redirected instantly
```

### Key Decisions:

* ✅ Analytics handled on backend (avoids CORS & rate limits)
* ✅ Uses Vercel headers for accurate user location
* ✅ Fallback mechanisms for local development
* ✅ Fire-and-forget tracking (no delay in redirect)

---

## 📂 Project Structure

```bash
/app
  /auth         → Login & Signup
  /[id]         → Redirect handler
  /api          → Backend routes (analytics, IP, etc.)

/components     → UI components
/lib            → API logic & utilities
/hooks          → Custom hooks
```

---

## ⚙️ Environment Setup

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL= your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY= your_supabase_key
NEXT_PUBLIC_DOMAIN_NAME=http://localhost:3000/
```

---

## 🧪 Run Locally

```bash
npm install
npm run dev
```

### Production Test (important)

```bash
npm run build
npm start
```

---

## 🌍 Analytics Handling (Important Insight)

* In production:

  * Uses **Vercel headers** → fast & accurate
* In development:

  * Falls back to IP-based API

This ensures:

* No rate limits
* No CORS issues
* Consistent tracking

---

## 📈 Future Improvements

* More user actions (edit, disable)
* lazy loading

---

## 💡 Key Learnings

* Handling **client vs server data boundaries**
* Avoiding **mixed content & CORS issues**
* Designing **resilient analytics pipelines**
* Managing **environment-specific behavior**

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a PR.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## ⭐ Support

If you found this useful, consider giving it a ⭐ on GitHub!

---

**Built with focus on real-world production challenges, not just features.**
