# 🚀 Mutual Fund Dashboard

A full-stack AI-powered financial analytics platform that enables users to explore mutual funds, compare fund performance, visualize analytics, manage watchlists, and receive intelligent investment recommendations.

Built using **React, Node.js, Express.js, and modern data visualization libraries**, this project demonstrates end-to-end full-stack development while showcasing data analytics and financial insights.

---

## 🏗️ System Architecture

![Architecture Diagram](docs/images/architecture.png)

The application follows a modular full-stack architecture consisting of:

* **Frontend Layer:** React.js, Vite, and Tailwind CSS for building an interactive and responsive user interface.
* **Backend Layer:** Node.js and Express.js for developing RESTful APIs and business logic.
* **Data Layer:** JSON-based mutual fund datasets for analytics and insights.
* **AI Layer:** AI-powered recommendation and advisory engine.

---

## ✨ Features

### 📊 Dashboard Analytics

* Portfolio overview and investment insights
* Interactive charts and KPIs
* Portfolio growth visualization

### 🔍 Fund Explorer

* Search and browse mutual funds
* Filter funds by risk and category
* Analyze fund performance metrics

### ⚖️ Fund Comparison

* Compare multiple funds side-by-side
* Evaluate returns and risk levels
* Make informed investment decisions

### 🤖 AI Investment Advisor

* Personalized investment recommendations
* AI-powered financial insights
* Risk-based fund suggestions

### ⭐ Watchlist Management

* Save favorite funds
* Track investment performance
* Monitor selected funds

### 📈 Advanced Analytics

* Risk vs Return analysis
* Sector allocation visualization
* Fund distribution insights

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router DOM
* Chart.js
* Recharts
* Framer Motion

### Backend

* Node.js
* Express.js
* CORS
* REST APIs
* JavaScript (ES Modules)

### Development Tools

* Git & GitHub
* VS Code

---

## 📸 Application Screenshots

### 📊 Dashboard

![Dashboard](docs/images/dashboard.png)

### 🔍 Fund Explorer

![Fund Explorer](docs/images/fund-explorer.png)

### ⚖️ Compare Funds

![Compare Funds](docs/images/compare-funds.png)

### 📈 Analytics Dashboard

![Analytics](docs/images/analytics.png)

### 🤖 AI Investment Advisor

![AI Advisor](docs/images/ai-advisor.png)

### ⭐ Watchlist

![Watchlist](docs/images/watchlist.png)

---

## 🔗 API Endpoints

| Endpoint               | Description                         |
| ---------------------- | ----------------------------------- |
| `/api/funds`           | Retrieve and search mutual funds    |
| `/api/compare`         | Compare multiple funds              |
| `/api/analytics`       | Generate analytics and insights     |
| `/api/recommendations` | Generate investment recommendations |
| `/api/watchlist`       | Manage watchlists                   |
| `/api/ai`              | AI-powered insights and advisory    |

---

## 📂 Repository Structure

```bash
mutual-fund-dashboard/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/
│   ├── data/
│   │   └── funds.json
│   │
│   ├── routes/
│   │   ├── fundRoutes.js
│   │   ├── compareRoutes.js
│   │   ├── analyticsRoutes.js
│   │   ├── recommendationRoutes.js
│   │   ├── watchlistRoutes.js
│   │   ├── aiRoutes.js
│   │   └── chatRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── docs/
│   └── images/
│       ├── architecture.png
│       ├── dashboard.png
│       ├── fund-explorer.png
│       ├── compare-funds.png
│       ├── analytics.png
│       ├── ai-advisor.png
│       └── watchlist.png
│
├── README.md
├── LICENSE
└── .gitignore
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Ananthasuryaprakash2006/mutual-fund-dashboard.git

cd mutual-fund-dashboard
```

### Backend Setup

```bash
cd backend

npm install

npm start
```

Backend Server:

```bash
http://localhost:4000
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend Server:

```bash
http://localhost:5173
```

---

## 🚀 Future Enhancements

* User Authentication & Authorization
* Database Integration using PostgreSQL or MongoDB
* Real-time Market Data APIs
* Portfolio Tracking and Optimization
* Cloud Deployment using AWS or Azure
* CI/CD Pipeline Integration

---

## 👨‍💻 About Me

Hi, I'm **Anantha Surya Prakash Pullagura**, an aspiring **Data Engineer** passionate about building scalable data solutions, analytics platforms, and data-driven applications.

My interests include **Data Engineering, Data Warehousing, ETL Pipelines, SQL Development, and Analytics**.

🔗 **GitHub:** https://github.com/Ananthasuryaprakash2006

🔗 **LinkedIn:** https://www.linkedin.com/in/surya-prakash-pullagura-bb0a7b38b/

---

## 📜 License

This project is licensed under the **MIT License**.

---

⭐ If you found this project useful, consider giving it a **star ⭐** on GitHub.
