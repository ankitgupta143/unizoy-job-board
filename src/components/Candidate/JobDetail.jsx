import Badge from "../shared/Badge";
import { formatDate } from "../../utils/helpers";

const typeVariant = {
  "Full-time": "green",
  "Part-time": "blue",
  "Contract": "orange",
  "Internship": "gray",
};

export default function JobDetail({ job, onApply }) {
  return (
    <div style={styles.wrapper}>
      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroInner}>
          <div style={styles.deptTag}>{job.department}</div>
          <h1 style={styles.title}>{job.title}</h1>
          <div style={styles.stats}>
            <Stat icon="📍" text={job.location} />
            <Stat icon="💼" text={job.type} />
            <Stat icon="💰" text={job.salary} />
            <Stat icon="📅" text={`Posted ${formatDate(job.postedAt)}`} />
          </div>
          <div style={styles.badges}>
            <Badge variant={typeVariant[job.type] || "default"}>{job.type}</Badge>
            <Badge variant="gray">{job.applications.length} applicants</Badge>
          </div>
          <button style={styles.applyBtn} onClick={onApply}>
            Apply for this Role →
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={styles.body}>
        <Section title="About the Role">
          <p style={styles.prose}>{job.description}</p>
        </Section>

        <Section title="Requirements">
          <ul style={styles.list}>
            {job.requirements.map((req, i) => (
              <li key={i} style={styles.listItem}>
                <span style={styles.bullet}>◆</span>
                {req}
              </li>
            ))}
          </ul>
        </Section>

        <div style={styles.cta}>
          <p style={styles.ctaText}>Sounds like a fit?</p>
          <button style={styles.applyBtnLg} onClick={onApply}>
            Apply Now →
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, text }) {
  return (
    <span style={styles.stat}>
      {icon} {text}
    </span>
  );
}

function Section({ title, children }) {
  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      {children}
    </div>
  );
}

const styles = {
  wrapper: { display: "flex", flexDirection: "column" },
  hero: {
    background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.08) 100%)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    padding: "40px 40px 36px",
  },
  heroInner: { maxWidth: "700px" },
  deptTag: {
    fontFamily: "'DM Mono', 'Courier New', monospace",
    fontSize: "11px",
    fontWeight: "600",
    color: "#6366f1",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "12px",
  },
  title: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "32px",
    fontWeight: "700",
    color: "#fff",
    margin: "0 0 20px",
    lineHeight: "1.25",
  },
  stats: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "16px",
  },
  stat: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.6)",
    fontFamily: "'DM Sans', sans-serif",
  },
  badges: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginBottom: "24px",
  },
  applyBtn: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    border: "none",
    borderRadius: "12px",
    padding: "13px 28px",
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    letterSpacing: "0.01em",
  },
  body: {
    padding: "36px 40px",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },
  section: { display: "flex", flexDirection: "column", gap: "14px" },
  sectionTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "20px",
    fontWeight: "700",
    color: "#fff",
    margin: 0,
    paddingBottom: "10px",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  },
  prose: {
    fontSize: "15px",
    color: "rgba(255,255,255,0.65)",
    lineHeight: "1.75",
    fontFamily: "'DM Sans', sans-serif",
    margin: 0,
  },
  list: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" },
  listItem: {
    display: "flex",
    gap: "10px",
    alignItems: "flex-start",
    fontSize: "15px",
    color: "rgba(255,255,255,0.65)",
    fontFamily: "'DM Sans', sans-serif",
    lineHeight: "1.5",
  },
  bullet: { color: "#6366f1", fontSize: "9px", marginTop: "5px", flexShrink: 0 },
  cta: {
    background: "rgba(99,102,241,0.08)",
    border: "1px solid rgba(99,102,241,0.2)",
    borderRadius: "14px",
    padding: "28px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
  },
  ctaText: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "20px",
    fontWeight: "700",
    color: "#fff",
    margin: 0,
  },
  applyBtnLg: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    border: "none",
    borderRadius: "12px",
    padding: "14px 32px",
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
  },
};