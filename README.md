# Unizoy Job Board 🚀

A full-stack Job Board application built for **Unizoy** using **React + Vite** on the frontend and **FastAPI (Python)** on the backend.

---

## 🌐 Live Demo

- **Frontend:** [https://unizoy-job-board.vercel.app](https://unizoy-job-board.vercel.app)

---

## 📸 Features

### 👤 Candidate View
- Browse all active job listings in a responsive card grid
- Filter jobs by department, job type, and keyword search
- Click any job card to see full job details
- Apply with name, email, resume link, and optional cover note
- Form validation with live error feedback

### 🔧 Admin View
- Toggle between Admin and Candidate mode via the navbar
- **Post Job** — Create a new listing with a live preview card
- **Manage Jobs** — Table view with edit, delete, and application count
- **Applications Panel** — View all applicants per job with CSV export

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite |
| Styling | Inline styles + Google Fonts |
| State Management | React Hooks (useState, useMemo, useCallback) |
| Backend | FastAPI (Python) |
| Validation | Pydantic v2 |
| Data Store | In-memory (ready for PostgreSQL) |

---

## 📁 Project Structure
```
unizoy-job-board/
│
├── index.html
├── vite.config.js
├── package.json
├── runtime.txt
│
├── src/                          # React Frontend
│   ├── main.jsx                  # Entry point
│   ├── App.jsx                   # Root component
│   │
│   ├── pages/
│   │   ├── HomePage.jsx          # Candidate job board
│   │   ├── AdminPostPage.jsx     # Admin: post a new job
│   │   └── AdminBoardPage.jsx    # Admin: manage listings
│   │
│   ├── components/
│   │   ├── shared/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Badge.jsx
│   │   │   └── FormField.jsx
│   │   │
│   │   ├── Candidate/
│   │   │   ├── JobCard.jsx
│   │   │   ├── JobDetail.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   └── ApplicationForm.jsx
│   │   │
│   │   └── Admin/
│   │       ├── PostJobForm.jsx
│   │       ├── JobTable.jsx
│   │       └── ApplicationsPanel.jsx
│   │
│   ├── hooks/
│   │   └── useJobs.js
│   │
│   ├── utils/
│   │   └── helpers.js
│   │
│   └── data/
│       └── mockData.js
│
└── backend/                      # FastAPI Backend
    ├── main.py
    ├── requirements.txt
    ├── routers/
    │   ├── jobs.py
    │   └── applications.py
    ├── schemas/
    │   └── schemas.py
    └── services/
        └── store.py
```

---

## 🚀 Getting Started

### Frontend Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Backend Setup
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r backend/requirements.txt

# Run backend server
uvicorn backend.main:app --reload
```

Open **http://localhost:8000/docs** for the interactive API docs.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | List all jobs |
| GET | `/api/jobs/:id` | Get single job |
| POST | `/api/jobs` | Create a new job |
| PATCH | `/api/jobs/:id` | Update a job |
| DELETE | `/api/jobs/:id` | Delete a job |
| POST | `/api/jobs/:id/applications` | Apply to a job |
| GET | `/api/jobs/:id/applications` | List job applicants |
| GET | `/api/applications` | List all applications |

---

## 🔮 Future Improvements

- Connect frontend to backend API
- Add PostgreSQL database for persistent storage
- Add admin authentication with JWT tokens
- Email notifications on new applications
- Resume file upload support

---

## 👨‍💻 Author

Built with ❤️ as a full-stack assignment project.
