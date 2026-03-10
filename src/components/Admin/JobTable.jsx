import { useState } from "react";
import Badge from "../shared/Badge";
import { formatDate } from "../../utils/helpers";

const typeVariant = {
  "Full-time": "green",
  "Part-time": "blue",
  "Contract": "orange",
  "Internship": "gray",
};

export default function JobTable({ jobs, onEdit, onDelete, onViewApplications }) {
  const [confirmDelete, setConfirmDelete] = useState(null);

  function handleDelete(id) {
    if (confirmDelete === id) {
      onDelete(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
    }
  }

  if (jobs.length === 0) {
    return (
      <div style={styles.empty}>
        <span style={styles.emptyIcon}>📋</span>
        <p style={styles.emptyText}>No jobs posted yet. Create your first listing!</p>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.tableHeader}>
        <ColHead style={{ flex: 3 }}>Role</ColHead>
        <ColHead style={{ flex: 1.5 }}>Location</ColHead>
        <ColHead style={{ flex: 1 }}>Type</ColHead>
        <ColHead style={{ flex: 1, textAlign: "center" }}>Apps</ColHead>
        <ColHead style={{ flex: 1.5 }}>Posted</ColHead>
        <ColHead style={{ flex: 2, textAlign: "right" }}>Actions</ColHead>
      </div>

      {/* Rows */}
      <div style={styles.rows}>
        {jobs.map((job) => (
          <div key={job.id} style={styles.row}>
            {/* Role */}
            <div style={{ flex: 3, display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={styles.jobTitle}>{job.title}</span>
              <span style={styles.jobDept}>{job.department}</span>
            </div>

            {/* Location */}
            <div style={{ flex: 1.5 }}>
              <span style={styles.cell}>📍 {job.location}</span>
            </div>

            {/* Type */}
            <div style={{ flex: 1 }}>
              <Badge variant={typeVariant[job.type] || "default"}>{job.type}</Badge>
            </div>

            {/* Apps */}
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <button
                style={styles.appsBtn}
                onClick={() => onViewApplications(job)}
              >
                {job.applications.length}
              </button>
            </div>

            {/* Posted */}
            <div style={{ flex: 1.5 }}>
              <span style={styles.cell}>{formatDate(job.postedAt)}</span>
            </div>

            {/* Actions */}
            <div style={{ flex: 2, display: "flex", gap: "8px", justifyContent: "flex-end" }}>
              <ActionBtn onClick={() => onEdit(job)} variant="edit">Edit</ActionBtn>
              <ActionBtn
                onClick={() => handleDelete(job.id)}
                variant={confirmDelete === job.id ? "confirm" : "delete"}
              >
                {confirmDelete === job.id ? "Confirm?" : "Delete"}
              </ActionBtn>
              {confirmDelete === job.id && (
                <ActionBtn onClick={() => setConfirmDelete(null)} variant="cancel">Cancel</ActionBtn>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ColHead({ children, style }) {
  return <div style={{ ...styles.colHead, ...style }}>{children}</div>;
}

function ActionBtn({ children, onClick, variant }) {
  const variantMap = {
    edit: { background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", color: "#a78bfa" },
    delete: { background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" },
    confirm: { background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.5)", color: "#ff6b6b" },
    cancel: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" },
  };
  return (
    <button style={{ ...styles.actionBtn, ...variantMap[variant] }} onClick={onClick}>
      {children}
    </button>
  );
}

const styles = {
  wrapper: {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "14px",
    overflow: "hidden",
  },
  tableHeader: {
    display: "flex",
    alignItems: "center",
    padding: "12px 20px",
    background: "rgba(255,255,255,0.03)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  colHead: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "10px",
    fontWeight: "600",
    color: "rgba(255,255,255,0.3)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  rows: { display: "flex", flexDirection: "column" },
  row: {
    display: "flex",
    alignItems: "center",
    padding: "16px 20px",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    gap: "12px",
    transition: "background 0.15s",
  },
  jobTitle: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: "600",
    fontSize: "15px",
    color: "#fff",
  },
  jobDept: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "11px",
    color: "#6366f1",
    letterSpacing: "0.05em",
  },
  cell: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    color: "rgba(255,255,255,0.5)",
  },
  appsBtn: {
    background: "rgba(99,102,241,0.12)",
    border: "1px solid rgba(99,102,241,0.25)",
    borderRadius: "8px",
    padding: "4px 12px",
    color: "#a78bfa",
    fontFamily: "'DM Mono', monospace",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    minWidth: "36px",
    textAlign: "center",
  },
  actionBtn: {
    borderRadius: "8px",
    padding: "6px 12px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.15s",
  },
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    padding: "60px 24px",
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "14px",
  },
  emptyIcon: { fontSize: "40px" },
  emptyText: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    color: "rgba(255,255,255,0.35)",
    margin: 0,
  },
};