import { useState } from "react";
import JobTable from "../components/Admin/JobTable";
import PostJobForm from "../components/Admin/PostJobForm";
import ApplicationsPanel from "../components/Admin/ApplicationsPanel";
import Modal from "../components/shared/Modal";
import Badge from "../components/shared/Badge";

export default function AdminBoardPage({ jobs, onUpdate, onDelete }) {
  const [editJob, setEditJob] = useState(null);
  const [viewingApps, setViewingApps] = useState(null);

  const totalApps = jobs.reduce((sum, j) => sum + j.applications.length, 0);

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <p style={styles.label}>Admin Panel</p>
            <h1 style={styles.title}>Manage Jobs</h1>
          </div>
          <div style={styles.statsRow}>
            <StatCard label="Total Listings" value={jobs.length} />
            <StatCard label="Total Applications" value={totalApps} highlight />
            <StatCard label="Active Roles" value={jobs.filter((j) => j.status === "active").length} />
          </div>
        </div>

        {/* Table */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>All Listings</h2>
            <Badge variant="gray">{jobs.length} jobs</Badge>
          </div>
          <JobTable
            jobs={jobs}
            onEdit={setEditJob}
            onDelete={onDelete}
            onViewApplications={setViewingApps}
          />
        </div>
      </div>

      {/* Edit modal */}
      <Modal
        isOpen={!!editJob}
        onClose={() => setEditJob(null)}
        title="Edit Job Listing"
        width="900px"
      >
        {editJob && (
          <PostJobForm
            editJob={editJob}
            onSubmit={(updated) => {
              onUpdate(editJob.id, updated);
              setEditJob(null);
            }}
            onCancel={() => setEditJob(null)}
          />
        )}
      </Modal>

      {/* Applications modal */}
      <Modal
        isOpen={!!viewingApps}
        onClose={() => setViewingApps(null)}
        title="Applications"
        width="640px"
      >
        {viewingApps && (
          <ApplicationsPanel
            job={viewingApps}
            onClose={() => setViewingApps(null)}
          />
        )}
      </Modal>
    </div>
  );
}

function StatCard({ label, value, highlight }) {
  return (
    <div style={{ ...styles.stat, ...(highlight ? styles.statHighlight : {}) }}>
      <span style={styles.statValue}>{value}</span>
      <span style={styles.statLabel}>{label}</span>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - 64px)",
    background: "#0a0a0f",
    padding: "48px 24px 80px",
  },
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexWrap: "wrap",
    gap: "24px",
  },
  label: {
    fontFamily: "'DM Mono', 'Courier New', monospace",
    fontSize: "11px",
    fontWeight: "600",
    color: "#6366f1",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    margin: "0 0 8px",
  },
  title: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "38px",
    fontWeight: "700",
    color: "#fff",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  statsRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  stat: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px",
    padding: "14px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    minWidth: "100px",
  },
  statHighlight: {
    background: "rgba(99,102,241,0.1)",
    border: "1px solid rgba(99,102,241,0.25)",
  },
  statValue: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "28px",
    fontWeight: "700",
    color: "#fff",
    lineHeight: 1,
  },
  statLabel: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "10px",
    color: "rgba(255,255,255,0.35)",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "22px",
    fontWeight: "700",
    color: "#fff",
    margin: 0,
  },
};