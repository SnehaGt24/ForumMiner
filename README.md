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

## Features

### Authentication
- Secure JWT Authentication
- User Registration and Login
- Password Encryption using bcrypt
- Protected Routes

### Discussion Management
- Create Discussions
- Edit Discussions
- Delete Discussions
- Like Posts
- Comment System
- Pagination
- Search Discussions

### Reddit Integration
- Import Reddit Posts
- Fetch Posts from Subreddits
- Store Reddit Metadata
- Track Upvotes and Comments
- Community Monitoring

### AI Features
- Intent Detection
- Sentiment Analysis
- Competitor Mention Detection
- Buying Intent Identification
- Lead Opportunity Discovery

### Analytics
- Dashboard Statistics
- Trending Topics
- Community Insights
- High-Intent Discussions

---

## Technology Stack

### Frontend
- React.js
- React Router
- Axios
- React Icons
- CSS3

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt.js

### Database
- MongoDB Atlas
- Mongoose

### AI & Data Analysis
- Reddit API
- Intent Detection
- Sentiment Analysis
- Keyword Analysis

### Deployment
- Vercel
- Render

---

## Project Structure

```
ForumMiner/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── assets/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/SnehaGt24/ForumMiner.git

cd ForumMiner
```

---

### Install Frontend

```bash
cd frontend

npm install
```

---

### Install Backend

```bash
cd ../backend

npm install
```

---

## Configure Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

REDDIT_CLIENT_ID=your_client_id

REDDIT_CLIENT_SECRET=your_client_secret
```

---

## Run the Backend

```bash
cd backend

npm run server
```

---

## Run the Frontend

```bash
cd frontend

npm run dev
```

---

## How It Works

1. Users register and log in securely using JWT Authentication.
2. The dashboard allows users to create, edit, delete, search, and manage discussions.
3. Reddit posts are imported using the Reddit API.
4. The application analyzes imported discussions for sentiment, intent, and competitor mentions.
5. High-intent discussions are highlighted to identify potential business opportunities.
6. Analytics dashboards display community insights, trending topics, and discussion statistics.

---

## REST API Endpoints

### Authentication

```
POST /api/auth/register

POST /api/auth/login
```

### Posts

```
GET    /api/posts

POST   /api/posts

PUT    /api/posts/:id

DELETE /api/posts/:id

POST   /api/posts/:id/like
```

### Comments

```
GET    /api/comments/:postId

POST   /api/comments

DELETE /api/comments/:id
```

### Reddit

```
GET  /api/reddit/:subreddit

POST /api/reddit/import
```

### Analytics

```
GET /api/analytics

GET /api/high-intent
```

---

## Future Improvements

- Dark Mode
- AI Reply Suggestions
- Real-time Notifications
- Advanced Search Filters
- Email Alerts
- Team Collaboration
- Export Analytics Reports
- Google Authentication
- Progressive Web App (PWA)

---

## Author

**Sneha G T**

Computer Science and Engineering

Presidency University

GitHub: https://github.com/SnehaGt24

---

## License

This project was developed for educational and learning purposes.