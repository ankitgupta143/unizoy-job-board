import Badge from "../shared/Badge";
import { daysAgo } from "../../utils/helpers";

const typeVariant = {
  "Full-time": "green",
  "Part-time": "blue",
  "Contract": "orange",
  "Internship": "gray",
};

export default function JobCard({ job, onClick }) {
  return (
    <div style={styles.card} onClick={() => onClick(job)}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.iconWrap}>
          <span style={styles.icon}>{deptIcon(job.department)}</span>
        </div>
        <div style={styles.meta}>
          <span style={styles.dept}>{job.department}</span>
          <span style={styles.posted}>{daysAgo(job.postedAt)}</span>
        </div>
      </div>

      {/* Title */}
      <h3 style={styles.title}>{job.title}</h3>

      {/* Details row */}
      <div style={styles.details}>
        <span style={styles.detail}>📍 {job.location}</span>
        <span style={styles.detail}>💰 {job.salary}</span>
      </div>

      {/* Excerpt */}
      <p style={styles.excerpt}>{job.description.slice(0, 120)}…</p>

      {/* Footer */}
      <div style={styles.footer}>
        <Badge variant={typeVariant[job.type] || "default"}>{job.type}</Badge>
        <span style={styles.applications}>
          {job.applications.length} applied
        </span>
        <span style={styles.cta}>View & Apply →</span>
      </div>
    </div>
  );
}

function deptIcon(dept) {
  const map = {
    Engineering: "⚙️",
    Design: "🎨",
    Product: "📦",
    Marketing: "📣",
    Operations: "🔧",
    Sales: "💼",
  };
  return map[dept] || "🏢";
}

const styles = {
  card: {
    background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(99,102,241,0.04) 100%)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "24px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    position: "relative",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  iconWrap: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    background: "rgba(99,102,241,0.12)",
    border: "1px solid rgba(99,102,241,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    flexShrink: 0,
  },
  icon: { lineHeight: 1 },
  meta: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  dept: {
    fontFamily: "'DM Mono', 'Courier New', monospace",
    fontSize: "11px",
    fontWeight: "600",
    color: "#6366f1",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  posted: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.35)",
    fontFamily: "'DM Sans', sans-serif",
  },
  title: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "20px",
    fontWeight: "700",
    color: "#fff",
    margin: 0,
    lineHeight: "1.3",
  },
  details: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
  },
  detail: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.55)",
    fontFamily: "'DM Sans', sans-serif",
  },
  excerpt: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.45)",
    lineHeight: "1.65",
    margin: 0,
    fontFamily: "'DM Sans', sans-serif",
    flex: 1,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "auto",
    paddingTop: "4px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
  applications: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.3)",
    fontFamily: "'DM Mono', monospace",
    marginLeft: "auto",
  },
  cta: {
    fontSize: "13px",
    color: "#6366f1",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: "600",
    letterSpacing: "0.01em",
  },
};