import PostJobForm from "../components/Admin/PostJobForm";

export default function AdminPostPage({ onPost }) {
  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <div style={styles.header}>
          <p style={styles.label}>Admin Panel</p>
          <h1 style={styles.title}>Post a New Job</h1>
          <p style={styles.sub}>
            Fill in the details below and your listing will go live immediately on the public board.
          </p>
        </div>
        <div style={styles.formCard}>
          <PostJobForm onSubmit={onPost} />
        </div>
      </div>
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
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    fontFamily: "'DM Mono', 'Courier New', monospace",
    fontSize: "11px",
    fontWeight: "600",
    color: "#6366f1",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    margin: 0,
  },
  title: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "38px",
    fontWeight: "700",
    color: "#fff",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  sub: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "16px",
    color: "rgba(255,255,255,0.45)",
    margin: 0,
    lineHeight: "1.6",
  },
  formCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "36px",
  },
};