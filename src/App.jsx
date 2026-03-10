import { useState } from "react";
import Navbar from "./components/shared/Navbar";
import HomePage from "./pages/HomePage";
import AdminPostPage from "./pages/AdminPostPage";
import AdminBoardPage from "./pages/AdminBoardPage";
import { useJobs } from "./hooks/useJobs";

export default function App() {
  const [view, setView] = useState("home");
  const [isAdmin, setIsAdmin] = useState(false);
  const { jobs, addJob, updateJob, deleteJob, applyToJob } = useJobs();

  function handleToggleAdmin() {
    setIsAdmin((prev) => !prev);
    setView((prev) => (prev === "home" ? "admin-board" : "home"));
  }

  function handlePostJob(jobData) {
    addJob(jobData);
  }

  function handleUpdateJob(id, updates) {
    updateJob(id, updates);
  }

  function handleDeleteJob(id) {
    deleteJob(id);
  }

  function handleApply(jobId, application) {
    applyToJob(jobId, application);
  }

  return (
    <div style={styles.root}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #0a0a0f; }
        input:focus, textarea:focus, select:focus {
          border-color: rgba(99,102,241,0.6) !important;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }
        button:hover { opacity: 0.85; }
        @keyframes modalIn {
          from { transform: translateY(12px) scale(0.98); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 3px; }
      `}</style>

      <Navbar
        currentView={view}
        onNavigate={setView}
        isAdmin={isAdmin}
        onToggleAdmin={handleToggleAdmin}
      />

      {view === "home" && (
        <HomePage jobs={jobs} onApply={handleApply} />
      )}

      {view === "admin-post" && isAdmin && (
        <AdminPostPage onPost={handlePostJob} />
      )}

      {view === "admin-board" && isAdmin && (
        <AdminBoardPage
          jobs={jobs}
          onUpdate={handleUpdateJob}
          onDelete={handleDeleteJob}
        />
      )}

      {/* Redirect if not admin */}
      {(view === "admin-post" || view === "admin-board") && !isAdmin && (
        <div style={styles.blocked}>
          <span style={styles.blockedIcon}>🔒</span>
          <p style={styles.blockedText}>Admin access required.</p>
          <button style={styles.blockedBtn} onClick={() => setView("home")}>
            Back to Jobs
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#0a0a0f",
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
  },
  blocked: {
    minHeight: "calc(100vh - 64px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
  },
  blockedIcon: { fontSize: "48px" },
  blockedText: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "22px",
    color: "rgba(255,255,255,0.4)",
    margin: 0,
  },
  blockedBtn: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    border: "none",
    borderRadius: "10px",
    padding: "12px 28px",
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "8px",
  },
};