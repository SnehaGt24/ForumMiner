<div align="center">

# 🚀 ForumMiner

### AI-Powered Reddit Intelligence Platform for Intent Detection, Lead Discovery & Community Analytics

Monitor Reddit discussions, identify buying intent, analyse customer sentiment, detect competitor mentions, and discover high-value business opportunities using AI.

<br>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-ForumMiner-success?style=for-the-badge)](https://forum-miner.vercel.app)
[![Backend API](https://img.shields.io/badge/⚙_Backend-Render-blue?style=for-the-badge)](https://forumminer-backend.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/SnehaGt24/ForumMiner)

<br>

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel)
![Render](https://img.shields.io/badge/Render-46E3B7?logo=render)
![License](https://img.shields.io/badge/License-MIT-success)

</div>

---

# 📖 About

ForumMiner is an AI-powered Reddit intelligence platform designed to help startups, businesses, developers, and product teams discover valuable customer conversations across Reddit.

Instead of manually browsing thousands of discussions, ForumMiner automatically imports Reddit posts, performs AI-powered intent detection, sentiment analysis, competitor monitoring, and identifies conversations where users are actively looking for products, alternatives, recommendations, or solutions.

The platform combines secure authentication, intelligent analytics, Reddit integration, and an interactive dashboard into a modern full-stack web application.

---

# ✨ Key Features

## 🔐 Authentication

- JWT Authentication
- Secure User Registration
- Login & Logout
- Password Encryption (bcrypt)
- Protected Routes
- Session Management

---

## 💬 Discussion Management

- Create Discussions
- Edit Discussions
- Delete Discussions
- Like Posts
- Comment System
- Pagination
- Search Discussions
- User-owned Post Management

---

## 🔍 Smart Search

- Search Discussions
- Instant Search Results
- Community Filtering
- Keyword Search
- Reddit Search Integration

---

## 🤖 AI Intelligence

- Intent Score Detection
- Customer Sentiment Analysis
- Competitor Mention Detection
- Buying Intent Recognition
- Lead Opportunity Identification
- AI-assisted Discussion Analysis

---

## 📊 Analytics Dashboard

- Total Discussions
- Total Users
- Positive vs Negative Sentiment
- Intent Distribution
- Trending Topics
- Top Communities
- Community Statistics

---

## 🌐 Reddit Integration

- Import Reddit Posts
- Reddit Metadata Storage
- Upvote Tracking
- Comment Tracking
- Subreddit Monitoring
- Community Analytics

---

## 🎯 High Intent Feed

Automatically identifies discussions where users are:

- Looking for software alternatives
- Asking for recommendations
- Comparing competitors
- Reporting product issues
- Requesting solutions
- Ready to purchase products
- Seeking implementation advice

---

# 🛠 Technology Stack

## Frontend

- React.js
- React Router DOM
- Axios
- React Icons
- CSS3
- Chart.js

---

## Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt.js
- REST APIs

---

## Database

- MongoDB Atlas
- Mongoose ODM

---

## AI & Analytics

- Intent Detection
- Sentiment Analysis
- Keyword Matching
- Opportunity Scoring
- Competitor Detection

---

## APIs

- Reddit API

---

## Deployment

- Vercel (Frontend)
- Render (Backend)

---

# 🏗 System Architecture

```text
                    Reddit API
                        │
                        ▼
              Reddit Data Collector
                        │
                        ▼
              Intent Detection Engine
                        │
            ┌───────────┴───────────┐
            ▼                       ▼
   Sentiment Analysis      Competitor Detection
            │                       │
            └───────────┬───────────┘
                        ▼
                  MongoDB Atlas
                        │
                        ▼
                Express REST API
                        │
                        ▼
                 React Frontend
                        │
                        ▼
             Analytics Dashboard
```


# 🔗 REST API Endpoints

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

---

## Posts

```http
GET    /api/posts
POST   /api/posts
PUT    /api/posts/:id
DELETE /api/posts/:id
POST   /api/posts/:id/like
```

---

## Comments

```http
GET    /api/comments/:postId
POST   /api/comments
DELETE /api/comments/:id
```

---

## Reddit

```http
GET  /api/reddit/:subreddit
POST /api/reddit/import
```

---

## Analytics

```http
GET /api/analytics
GET /api/high-intent
```

---

# 📂 Project Structure

```text
ForumMiner
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── styles
│   │   ├── assets
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   ├── utils
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/SnehaGt24/ForumMiner.git
```

---

## Install Dependencies

```bash
cd ForumMiner

npm install

cd frontend
npm install

cd ../backend
npm install
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

REDDIT_CLIENT_ID=your_client_id

REDDIT_CLIENT_SECRET=your_client_secret
```

---

## Run the Application

Backend

```bash
npm run server
```

Frontend

```bash
npm run dev
```

---

# 👩‍💻 Author

**Sneha G T**

Computer Science & Engineering Student

Presidency University, Bengaluru

# 📄 License

This project is licensed under the MIT License.

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a Star on GitHub!

Built with ❤️ using React, Node.js, Express & MongoDB.

</div>