# 🚀 Job Application Tracker

A full-stack web application to track your internship and job applications with AI-powered resume scoring and interview preparation. Built to solve a real problem — managing multiple job applications during internship season.

🔗 **Live Demo:** [job-tracker-sand-eight.vercel.app](https://job-tracker-sand-eight.vercel.app/)
🔗 **Backend API:** [job-tracker-jdoz.onrender.com](https://job-tracker-jdoz.onrender.com)
🔗 **GitHub:** [prince728](https://github.com/prince728/Job-Tracker)

---

## 📸 Screenshots

## 📸 Screenshots

### Login
![Login](screenshots/login.png)

### Home - Application Tracker
![Home](screenshots/home.png)

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Interview Prep
![Interview Prep](screenshots/interview-prep.png)

### Resume Job Match Scorer
![Resume Scorer](screenshots/resume-scorer.png)

## ✨ Features

### Core
- 🔐 **Secure Authentication** — Signup/login with JWT stored in httpOnly cookies, protected against XSS attacks
- 📋 **Application Management** — Add, edit, delete and track job applications
- 🏷️ **Status Tracking** — Track progress across Applied, OA, Interview, Offer, and Rejected stages
- 📅 **Follow-up Reminders** — Set follow-up dates for each application
- 🔗 **Job Links & Notes** — Store job posting links and personal notes per application

### Analytics
- 📊 **Dashboard** — Visual breakdown of application stats
- 🥧 **Status Pie Chart** — See distribution of applications across all stages
- 📈 **Applications Over Time** — Bar chart showing application volume by month
- 🔢 **Stats Cards** — Total applications, response rate, and per-status counts

### AI Features (powered by Groq)
- 🤖 **Resume-Job Match Scorer** — Paste any job description and get:
  - Match score out of 100
  - Matching skills you already have
  - Missing skills to work on
  - 3 specific improvement suggestions
- 🎯 **Interview Prep Generator** — Enter company and role and get:
  - DSA & Technical questions
  - Role-specific questions
  - Behavioural questions
  - Company-specific questions

### Performance & Security
- ⚡ **Redis Caching** — Dashboard queries cached for faster load times
- 🛡️ **Rate Limiting** — Auth and AI routes protected against abuse
- 🐳 **Dockerized** — Fully containerized backend for consistent environments

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| Charts | Recharts |
| Forms | React Hook Form |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Backend | Node.js, Express.js |
| ORM | Prisma 6 |
| Database | PostgreSQL (Neon) |
| Cache | Redis (Upstash), ioredis |
| AI | Groq API |
| Auth | JWT, bcrypt, cookie-parser |
| Containerization | Docker, Docker Compose |
| Deployment | Vercel (frontend), Render (backend) |

---

## 🏗️ Project Structure
```
job-tracker/
├── frontend/
│   ├── public/
│   └── src/
│       ├── api/
│       │   └── axios.js              # Axios instance with credentials
│       ├── components/
│       │   ├── Navbar.jsx            # Navigation with logout
│       │   ├── ApplicationTable.jsx  # Applications list table
│       │   └── ApplicationForm.jsx   # Add/Edit modal form
│       ├── context/
│       │   └── AuthContext.jsx       # Global auth state
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── Signup.jsx
│       │   ├── Home.jsx              # Main application list
│       │   ├── Dashboard.jsx         # Analytics charts
│       │   ├── ResumeScore.jsx       # AI resume scorer
│       │   └── InterviewPrep.jsx     # AI interview questions
│       ├── routes/
│       │   └── appRoutes.jsx         # Route definitions
│       └── services/
│           ├── authApi.js            # Auth API calls
│           ├── applicationApi.js     # Application CRUD API calls
│           └── aiApi.js              # AI feature API calls
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma             # Database schema
│   │   └── migrations/               # Migration history
│   ├── src/
│   │   ├── config/
│   │   │   └── redis.js              # Redis client setup
│   │   ├── Controller/
│   │   │   ├── auth.controller.js    # Signup, login, logout, me
│   │   │   ├── application.controller.js # CRUD + Redis caching
│   │   │   └── ai.controller.js      # Groq AI integration
│   │   ├── Middlewares/
│   │   │   ├── auth.middleware.js    # JWT verification
│   │   │   ├── rateLimiter.js        # Auth rate limiting
│   │   │   └── aiRateLimiter.js      # AI rate limiting
│   │   └── Routes/
│   │       ├── user.routes.js        # Auth routes
│   │       ├── application.routes.js # Application routes
│   │       └── ai.routes.js          # AI routes
│   ├── Dockerfile
│   ├── server.js
│   └── app.js
│
├── docker-compose.yml
└── README.md

```

---

## 🗄️ Database Schema

```prisma
model User {
  id           Int           @id @default(autoincrement())
  name         String
  email        String        @unique
  password     String
  createdAt    DateTime      @default(now())
  applications Application[]
}

model Application {
  id           Int       @id @default(autoincrement())
  userId       Int
  user         User      @relation(fields: [userId], references: [id])
  companyName  String
  roleTitle    String
  status       String    @default("applied")
  dateApplied  DateTime
  jobLink      String?
  notes        String?
  followUpDate DateTime?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}
```

---

## 🔌 API Endpoints

### Auth Routes
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | Login and get JWT cookie | No |
| POST | `/api/auth/logout` | Clear session | No |
| GET | `/api/auth/me` | Get logged in user | Yes |

### Application Routes
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/api/application/create` | Create application | Yes |
| GET | `/api/application/get-all` | Get all (Redis cached) | Yes |
| GET | `/api/application/get/:id` | Get single application | Yes |
| PUT | `/api/application/update/:id` | Update application | Yes |
| DELETE | `/api/application/delete/:id` | Delete application | Yes |

### AI Routes
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/api/ai/match-score` | Resume job match scorer | Yes |
| POST | `/api/ai/interview-prep` | Generate interview questions | Yes |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Docker Desktop
- PostgreSQL or Neon account
- Groq API key
- Upstash Redis account

### Local Development

**1. Clone the repo**
```bash
git clone https://github.com/prince728/Job-Tracker
cd job-Tracker
```

**2. Setup backend**
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/job_tracker"
JWT_SECRET="your-jwt-secret-key"
GROQ_API_KEY="your-groq-api-key"
REDIS_URL="redis://localhost:6379"
PORT=5000
CLIENT_URL="http://localhost:5173"
NODE_ENV="development"
```

Run migrations:
```bash
npx prisma migrate dev
```

**3. Setup frontend**
```bash
cd frontend
npm install
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
```

**4. Run with Docker (backend + Redis)**
```bash
docker-compose up --build
```

**5. Run frontend separately**
```bash
cd frontend
npm run dev
```

Open `http://localhost:5173`

---

## 🌐 Deployment

| Service | Provider | Purpose |
|---------|----------|---------|
| Frontend | Vercel | React app hosting |
| Backend | Render (Docker) | Node.js API |
| Database | Neon | PostgreSQL |
| Cache | Upstash | Redis |

---

## 💡 What I Learned

- **JWT in httpOnly cookies** — more secure than localStorage, prevents XSS attacks while maintaining stateless auth
- **Redis caching strategy** — implemented cache-aside pattern with TTL and cache invalidation on mutations
- **Rate limiting with Redis** — used atomic `INCR` + `EXPIRE` operations to implement sliding window rate limiting
- **Docker for development parity** — containerized backend ensures the same environment locally and in production
- **Prisma ORM** — used migrations, relations, and type-safe queries with PostgreSQL
- **AI prompt engineering** — structured prompts with strict JSON output format for reliable parsing
- **Full-stack deployment** — deployed across 4 different cloud providers with proper env separation

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

MIT

---

⭐ If you found this project useful, please give it a star!
