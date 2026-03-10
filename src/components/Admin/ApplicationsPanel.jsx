import Badge from "../shared/Badge";
import { formatDate } from "../../utils/helpers";

export default function ApplicationsPanel({ job, onClose }) {
  const apps = job.applications;

  return (
    <div style={styles.wrapper}>
      <div style={styles.jobMeta}>
        <div>
          <p style={styles.metaLabel}>Applications for</p>
          <h3 style={styles.metaTitle}>{job.title}</h3>
        </div>
        <Badge variant={apps.length > 0 ? "green" : "gray"}>
          {apps.length} applicant{apps.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {apps.length === 0 ? (
        <div style={styles.empty}>
          <span style={styles.emptyIcon}>📭</span>
          <p style={styles.emptyText}>No applications yet for this role.</p>
        </div>
      ) : (
        <div style={styles.list}>
          {apps.map((app, i) => (
            <div key={app.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.avatar}>{app.name[0].toUpperCase()}</div>
                <div style={styles.info}>
                  <span style={styles.name}>{app.name}</span>
                  <a href={`mailto:${app.email}`} style={styles.email}>{app.email}</a>
                </div>
                <span style={styles.num}>#{i + 1}</span>
              </div>

              {app.coverNote && (
                <p style={styles.coverNote}>"{app.coverNote}"</p>
              )}

              <div style={styles.cardFooter}>
                <a
                  href={app.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.resumeLink}
                >
                  📄 View Resume →
                </a>
                <span style={styles.date}>Applied {formatDate(app.appliedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={styles.actions}>
        <button style={styles.closeBtn} onClick={onClose}>Close</button>
        {apps.length > 0 && (
          <button
            style={styles.exportBtn}
            onClick={() => {
              const csv = [
                ["Name", "Email", "Resume", "Cover Note", "Date"].join(","),
                ...apps.map((a) =>
                  [a.name, a.email, a.resumeLink, `"${(a.coverNote || "").replace(/"/g, '""')}"`, a.appliedAt].join(",")
                ),
              ].join("\n");
              const blob = new Blob([csv], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `applications-${job.id}.csv`;
              a.click();
            }}
          >
            ⬇ Export CSV
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: { display: "flex", flexDirection: "column", gap: "20px" },
  jobMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
    background: "rgba(99,102,241,0.08)",
    border: "1px solid rgba(99,102,241,0.2)",
    borderRadius: "12px",
    padding: "16px 20px",
  },
  metaLabel: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "10px",
    color: "rgba(255,255,255,0.35)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    margin: "0 0 4px",
  },
  metaTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "18px",
    fontWeight: "700",
    color: "#fff",
    margin: 0,
  },
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    padding: "40px 24px",
    background: "rgba(255,255,255,0.02)",
    borderRadius: "12px",
    border: "1px dashed rgba(255,255,255,0.08)",
  },
  emptyIcon: { fontSize: "36px" },
  emptyText: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    color: "rgba(255,255,255,0.35)",
    margin: 0,
  },
  list: { display: "flex", flexDirection: "column", gap: "12px", maxHeight: "420px", overflowY: "auto" },
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: "16px",
    fontFamily: "'DM Sans', sans-serif",
    flexShrink: 0,
  },
  info: { display: "flex", flexDirection: "column", gap: "2px", flex: 1 },
  name: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: "600",
    fontSize: "15px",
    color: "#fff",
  },
  email: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "12px",
    color: "#6366f1",
    textDecoration: "none",
  },
  num: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "12px",
    color: "rgba(255,255,255,0.2)",
  },
  coverNote: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    color: "rgba(255,255,255,0.5)",
    fontStyle: "italic",
    lineHeight: "1.6",
    margin: 0,
    background: "rgba(255,255,255,0.03)",
    borderLeft: "3px solid rgba(99,102,241,0.4)",
    padding: "8px 12px",
    borderRadius: "0 6px 6px 0",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  resumeLink: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    fontWeight: "600",
    color: "#a78bfa",
    textDecoration: "none",
  },
  date: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "11px",
    color: "rgba(255,255,255,0.25)",
  },
  actions: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
    paddingTop: "8px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
  closeBtn: {
    background: "none",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "10px",
    padding: "9px 20px",
    color: "rgba(255,255,255,0.5)",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    cursor: "pointer",
  },
  exportBtn: {
    background: "rgba(99,102,241,0.1)",
    border: "1px solid rgba(99,102,241,0.3)",
    borderRadius: "10px",
    padding: "9px 20px",
    color: "#a78bfa",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },
};