import { useState, useMemo } from "react";
import JobCard from "../components/Candidate/JobCard";
import JobDetail from "../components/Candidate/JobDetail";
import ApplicationForm from "../components/Candidate/ApplicationForm";
import FilterBar from "../components/Candidate/FilterBar";
import Modal from "../components/shared/Modal";

const INITIAL_FILTERS = { query: "", department: "All", type: "All" };

export default function HomePage({ jobs, onApply }) {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyingTo, setApplyingTo] = useState(null);

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      if (job.status !== "active") return false;
      if (filters.department !== "All" && job.department !== filters.department) return false;
      if (filters.type !== "All" && job.type !== filters.type) return false;
      if (filters.query) {
        const q = filters.query.toLowerCase();
        return (
          job.title.toLowerCase().includes(q) ||
          job.department.toLowerCase().includes(q) ||
          job.description.toLowerCase().includes(q) ||
          job.location.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [jobs, filters]);

  function handleApply(application) {
    onApply(applyingTo.id, application);
  }

  return (
    <div style={styles.page}>
      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroInner}>
          <p style={styles.heroTagline}>Join the team that's shaping tomorrow</p>
          <h1 style={styles.heroTitle}>
            Build your career<br />at <span style={styles.heroAccent}>Unizoy</span>
          </h1>
          <p style={styles.heroSub}>
            We're a fast-moving team with big ambitions. Find a role where you'll
            do the best work of your life.
          </p>
          <div style={styles.heroPills}>
            <Pill>🌍 Remote-first</Pill>
            <Pill>🏥 Full benefits</Pill>
            <Pill>📈 Equity for all</Pill>
            <Pill>🎓 Learning budget</Pill>
          </div>
        </div>
      </div>

      {/* Listings */}
      <div style={styles.content}>
        <FilterBar filters={filters} onChange={setFilters} totalJobs={filtered.length} />

        {filtered.length === 0 ? (
          <div style={styles.empty}>
            <span style={styles.emptyIcon}>🔍</span>
            <p style={styles.emptyText}>No jobs match your filters. Try adjusting your search.</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} onClick={setSelectedJob} />
            ))}
          </div>
        )}
      </div>

      {/* Job detail modal */}
      <Modal
        isOpen={!!selectedJob && !applyingTo}
        onClose={() => setSelectedJob(null)}
        title=""
        width="720px"
      >
        {selectedJob && (
          <div style={{ margin: "-20px -28px -28px" }}>
            <JobDetail
              job={selectedJob}
              onApply={() => setApplyingTo(selectedJob)}
            />
          </div>
        )}
      </Modal>

      {/* Application form modal */}
      <Modal
        isOpen={!!applyingTo}
        onClose={() => setApplyingTo(null)}
        title="Apply for this Role"
        width="560px"
      >
        {applyingTo && (
          <ApplicationForm
            job={applyingTo}
            onSubmit={handleApply}
            onCancel={() => { setApplyingTo(null); setSelectedJob(null); }}
          />
        )}
      </Modal>
    </div>
  );
}

function Pill({ children }) {
  return <span style={styles.pill}>{children}</span>;
}

const styles = {
  page: { minHeight: "calc(100vh - 64px)" },
  hero: {
    background: "linear-gradient(160deg, #0d0d1a 0%, #0f0f20 50%, #0a0a14 100%)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    padding: "80px 24px 72px",
    position: "relative",
    overflow: "hidden",
  },
  heroInner: {
    maxWidth: "700px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  heroTagline: {
    fontFamily: "'DM Mono', 'Courier New', monospace",
    fontSize: "12px",
    fontWeight: "500",
    color: "#6366f1",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    margin: 0,
  },
  heroTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(36px, 6vw, 60px)",
    fontWeight: "700",
    color: "#fff",
    lineHeight: "1.15",
    margin: 0,
    letterSpacing: "-1px",
  },
  heroAccent: {
    background: "linear-gradient(135deg, #6366f1, #a78bfa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSub: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "18px",
    color: "rgba(255,255,255,0.5)",
    lineHeight: "1.7",
    margin: 0,
    maxWidth: "540px",
  },
  heroPills: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "8px",
  },
  pill: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "20px",
    padding: "6px 14px",
    fontSize: "13px",
    color: "rgba(255,255,255,0.6)",
    fontFamily: "'DM Sans', sans-serif",
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px 24px 80px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: "20px",
    marginTop: "8px",
  },
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    padding: "80px 24px",
  },
  emptyIcon: { fontSize: "40px" },
  emptyText: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    color: "rgba(255,255,255,0.35)",
    margin: 0,
  },
};