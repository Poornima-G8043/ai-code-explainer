# 🚀 CodeLens AI — AI Code Explainer
> Hackathon Project | 6th Sem | GenAI Domain | Jain College of Engineering

![CodeLens AI](https://img.shields.io/badge/CodeLens-AI%20Powered-00d4ff?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47a248?style=for-the-badge&logo=mongodb)

---

## 📋 Features

### Core Features ✅
- 🔐 User Authentication (Login/Register with JWT)
- 📝 Paste or Upload Code (supports .c, .cpp, .java, .py, .js, .sql)
- 🧠 Line-by-Line AI Explanation
- 🌐 Multi-language Support (C, C++, Java, Python, JavaScript, SQL)
- 📋 Exam-ready Summary Generation

### Extra / Innovation Features ✅
- 🎓 Level-Based Explanation (Beginner / Intermediate / Advanced)
- 🐛 Bug Detector + Fix Suggestion (with line number + reason)
- ⏱️ Time & Space Complexity Analyzer (Big-O notation)
- 💾 History saved to MongoDB per user
- 📋 Copy all results to clipboard
- 🎨 VS Code-style dark editor UI

---

## 🗂️ Project Structure

```
ai-code-explainer/
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema
│   │   └── History.js       # Code history schema
│   ├── routes/
│   │   ├── auth.js          # /register, /login
│   │   └── code.js          # /analyze-code, /history
│   ├── middleware/
│   │   └── auth.js          # JWT middleware
│   ├── server.js            # Express entry point
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   └── Navbar.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── AuthPage.js      # Login/Register
    │   │   ├── Dashboard.js     # Code input + settings
    │   │   └── ResultPage.js    # AI results display
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18+ installed
- MongoDB installed locally OR MongoDB Atlas account
- Anthropic API key (free at https://console.anthropic.com)

---

### Step 1 — Clone / Extract Project
```bash
cd ai-code-explainer
```

---

### Step 2 — Setup Backend

```bash
cd backend
npm install
```

Create your `.env` file:
```bash
cp .env.example .env
```

Edit `.env` with your values:
```env
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxx
MONGO_URI=mongodb://localhost:27017/ai_code_explainer
JWT_SECRET=my_super_secret_key_2025
PORT=5000
```

Start the backend:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

✅ You should see:
```
🚀 Server running on port 5000
✅ MongoDB connected
```

---

### Step 3 — Setup Frontend

```bash
cd ../frontend
npm install
```

Create `.env` file in frontend folder:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm start
```

✅ Opens at: **http://localhost:3000**

---

## 🔑 Getting API Keys

### Anthropic API Key (Claude AI)
1. Go to https://console.anthropic.com
2. Sign up / Login
3. Go to **API Keys** section
4. Click **Create Key**
5. Copy and paste into `.env` as `ANTHROPIC_API_KEY`

### MongoDB (Local)
- Install MongoDB Community: https://www.mongodb.com/try/download/community
- Default URI: `mongodb://localhost:27017/ai_code_explainer`

### MongoDB Atlas (Cloud - Recommended for Demo)
1. Go to https://cloud.mongodb.com
2. Create free cluster
3. Get connection string
4. Replace `MONGO_URI` in `.env`

---

## 🌐 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/register` | Register new user | ❌ |
| POST | `/api/login` | Login user | ❌ |
| POST | `/api/analyze-code` | Analyze code with AI | ✅ |
| GET | `/api/history` | Get user's history | ✅ |

### Sample Request — Analyze Code
```json
POST /api/analyze-code
Authorization: Bearer <token>

{
  "code": "def hello():\n    print('Hello World')",
  "language": "python",
  "level": "beginner"
}
```

### Sample Response
```json
{
  "success": true,
  "result": {
    "explanation": "Line 1: def hello(): — This defines a function named hello...",
    "errors": "No bugs detected ✅",
    "complexity": "Time Complexity: O(1) — constant time...",
    "summary": "• This is a simple Python function\n• print() outputs text..."
  }
}
```

---

## 🗄️ Database Schema

### Users Collection
```json
{
  "_id": "ObjectId",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "<bcrypt hash>",
  "createdAt": "2025-01-01T00:00:00Z"
}
```

### History Collection
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: User)",
  "code": "def bubble_sort(arr): ...",
  "language": "python",
  "level": "intermediate",
  "result": {
    "explanation": "...",
    "errors": "...",
    "complexity": "...",
    "summary": "..."
  },
  "createdAt": "2025-01-01T00:00:00Z"
}
```

---

## 🎯 Supported Languages

| Language | Extension | Example |
|----------|-----------|---------|
| Python | .py | Algorithms, data structures |
| Java | .java | OOP, recursion |
| C | .c | Pointers, memory |
| C++ | .cpp | STL, classes |
| JavaScript | .js | DOM, async |
| SQL | .sql | Queries, joins |

---

## 🏆 Hackathon Scoring Alignment

| Criteria | Weight | How We Cover It |
|----------|--------|-----------------|
| Prototype Quality | 25% | Full working app: auth + AI + DB |
| Implementation of Feedback | 25% | Clean modular code, easy to modify |
| UI/UX Design | 20% | Dark futuristic theme, responsive, tabs |
| Functionality & Stability | 15% | Error handling, loading states, JWT |
| Innovation & Creativity | 10% | 3 levels + bug detector + complexity |
| Presentation | 5% | Clear sections, copy feature, badges |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6 |
| Styling | Custom CSS (no framework needed) |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| AI | Anthropic Claude (claude-sonnet-4) |
| Fonts | JetBrains Mono + Syne (Google Fonts) |

---

## ⚡ Quick Demo Flow

1. Open http://localhost:3000
2. Register with name/email/password
3. On Dashboard: select **Python**, level **Beginner**
4. Click **"📋 Sample"** to load example code
5. Click **"🚀 Analyze Code"**
6. View results across 4 tabs: Explanation, Bugs, Complexity, Summary

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB not connecting | Ensure MongoDB is running: `mongod` |
| API key error | Check `.env` has correct `ANTHROPIC_API_KEY` |
| CORS error | Backend must run on port 5000 |
| npm install fails | Use Node.js v18+: `node --version` |
| Blank page | Check browser console, ensure both servers running |

---

## 👨‍💻 Team
**Jain College of Engineering & Research, Belagavi**
6th Semester | GenAI Domain | Hackathon 2025

---

*Built with ❤️ and ☕ during hackathon hours*