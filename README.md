# 🚀 ForumMiner

ForumMiner is an AI-powered MERN Stack application that helps users discover high-intent discussions, analyze community conversations, detect competitors, and generate intelligent AI replies. The platform combines forum-style discussions with AI and analytics to help users identify valuable business opportunities.

---

## 📌 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Edit Profile
- Change Password

---

### 📝 Forum Features

- Create Discussion
- Edit Discussion
- Delete Discussion
- Like / Unlike Posts
- Search Discussions
- Pagination
- My Posts

---

### 🤖 AI Features

- AI Reply Generation using **Llama 3.2**
- AI replies for:
  - Reddit Posts
  - Forum Posts
- Context-aware response generation
- Loading indicators while generating replies

---

### 🔥 Lead Discovery

- High Intent Detection
- Intent Score
- Lead Status Tracking
- Competitor Detection
- Sentiment Analysis

---

### 📊 Analytics Dashboard

- Total Posts
- High Intent Posts
- Average Intent Score
- Average Sentiment

Charts Included:

- Pie Chart – Posts by Source
- Bar Chart – Sentiment Distribution
- Bar Chart – Top Subreddits
- Line Chart – Intent Trend

---

### 👤 User Profile

- Profile Statistics
- Edit Profile
- Change Password
- View My Posts

---

## 🛠 Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- React Icons
- React Toastify
- Chart.js
- React ChartJS 2

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js

### AI

- Ollama
- Llama 3.2 (3B)

---

## 📂 Project Structure

```
ForumMiner/
│
├── client/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── App.jsx
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── server.js
│
└── README.md
```

---

## ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/forumminer.git
```

### Backend

```bash
cd server
npm install
npm start
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## 🧠 AI Setup

Install Ollama.

Pull Llama 3.2:

```bash
ollama pull llama3.2:3b
```

Run Ollama:

```bash
ollama serve
```

---

## 📸 Screenshots

Add screenshots of:

- Login Page
- Dashboard
- High Intent Page
- Analytics Dashboard
- Profile Page
- AI Reply Generation

---

## 🚀 Future Enhancements

- Live Reddit API Integration
- Real-time Notifications
- Email Alerts
- Export Analytics
- AI Conversation Thread Support
- Dark Mode
- Multi-language Support

---

## 👩‍💻 Author

**Sneha GT**

Computer Science Engineering Student

LinkedIn:
https://www.linkedin.com/in/sneha-gt

GitHub:
https://github.com/SnehaGt24

---

## 📄 License

This project is developed for academic and educational purposes.