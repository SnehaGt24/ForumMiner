# 🚀 ForumMiner - AI-Powered Reddit Intent Monitoring Platform

<p align="center">

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js)
![Express](https://img.shields.io/badge/Framework-Express-000000?logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-green)

</p>

> **ForumMiner is an AI-powered Reddit Intent Monitoring Platform that discovers high-intent customer conversations, analyzes sentiment, tracks competitor mentions, and helps businesses identify potential leads using Reddit discussions.**

---

# 🌐 Live Demo

### 🚀 Frontend

https://forum-miner.vercel.app

### ⚙ Backend API

https://forumminer-backend.onrender.com

---

# 📑 Table of Contents

- About
- Features
- Screenshots
- Tech Stack
- Project Architecture
- Installation
- Environment Variables
- API Endpoints
- Folder Structure
- Future Enhancements
- Author

---

# 📖 About

ForumMiner continuously monitors Reddit discussions and identifies conversations where users are:

- Looking for software alternatives
- Asking for recommendations
- Comparing products
- Reporting problems
- Expressing buying intent

The platform combines AI-powered sentiment analysis with intent scoring to help businesses discover valuable customer opportunities.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Password Encryption

---

## 💬 Discussion Management

- Create Posts
- Edit Posts
- Delete Posts
- Like Posts
- Comment System

---

## 🔍 Smart Search

- Search Discussions
- Instant Results
- Reddit Post Search
- Community Filtering

---

## 🤖 AI Features

- Sentiment Analysis
- Intent Score Detection
- Competitor Detection
- AI Opportunity Ranking

---

## 📊 Analytics Dashboard

- Total Discussions
- Positive vs Negative Sentiment
- Intent Distribution
- Top Subreddits
- Competitor Analytics

---

## 🌐 Reddit Integration

- Import Reddit Posts
- Fetch Trending Discussions
- Store Reddit Metadata
- Monitor Opportunities

---

## 🎯 High Intent Feed

Automatically identifies posts where users are:

- Looking for alternatives
- Asking for recommendations
- Facing product issues
- Ready to purchase

---

# 📷 Screenshots

## 🔐 Login Page

![Login](README-assets/login.png)

---

## 🏠 Dashboard

![Dashboard](README-assets/dashboard.png)

---

## 📊 Analytics

![Analytics](README-assets/analytics.png)

---

## 🔥 High Intent Opportunities

![High Intent](README-assets/high-intent.png)

---

## 🌐 Reddit Integration

![Reddit](README-assets/reddit.png)

---

## 🤖 AI Suggestions

![AI Reply](README-assets/ai-reply.png)

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- React Router
- Axios
- React Toastify
- Chart.js

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt.js

---

## AI Services

- Groq API
- Sentiment Analysis
- Intent Detection
- Competitor Detection

---

## Deployment

Frontend

- Vercel

Backend

- Render

Database

- MongoDB Atlas

---

# 🏗 Project Architecture

```
                 Reddit API
                     │
                     ▼
          Reddit Data Collector
                     │
                     ▼
        Intent & Sentiment Engine
                     │
                     ▼
            MongoDB Database
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
 Express REST API         Analytics Engine
        │                         │
        └────────────┬────────────┘
                     ▼
               React Frontend
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/SnehaGt24/ForumMiner.git
```

---

## Backend

```bash
cd backend
npm install
```

Create a `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GROQ_API_KEY=your_api_key
```

Run

```bash
npm start
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🔑 Environment Variables

```env
PORT=

MONGO_URI=

JWT_SECRET=

GROQ_API_KEY=
```

---

# 📡 Main API Routes

## Authentication

```
POST /api/auth/register

POST /api/auth/login

GET /api/auth/profile
```

---

## Posts

```
GET /api/posts

POST /api/posts

PUT /api/posts/:id

DELETE /api/posts/:id

GET /api/posts/search
```

---

## Reddit

```
GET /api/reddit

POST /api/reddit/import
```

---

## Analytics

```
GET /api/analytics

GET /api/posts/high-intent
```

---

# 📂 Folder Structure

```
ForumMiner

backend
│
├── config
├── controllers
├── middleware
├── models
├── routes
├── services
├── jobs
└── server.js

frontend
│
├── components
├── pages
├── services
├── styles
├── assets
└── App.jsx
```

---

# 🚀 Future Enhancements

- AI Reply Generator
- Email Notifications
- Export Reports
- User Profiles
- Dark Mode
- Advanced Analytics
- More Social Media Integrations
- Live Reddit Streaming

---

# 👩‍💻 Author

## Sneha GT

Computer Science Engineering Student

GitHub

https://github.com/SnehaGt24

---

# ⭐ If you like this project

Give it a ⭐ on GitHub!