export default function Badge({ children, variant = "default" }) {
  const variantStyles = {
    default: { background: "rgba(99,102,241,0.15)", color: "#a78bfa", border: "1px solid rgba(99,102,241,0.25)" },
    green: { background: "rgba(34,197,94,0.12)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.25)" },
    orange: { background: "rgba(249,115,22,0.12)", color: "#fb923c", border: "1px solid rgba(249,115,22,0.25)" },
    red: { background: "rgba(239,68,68,0.12)", color: "#f87171", border: "1px solid rgba(239,68,68,0.25)" },
    gray: { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" },
    blue: { background: "rgba(59,130,246,0.12)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.25)" },
  };

  return (
    <span style={{ ...styles.badge, ...variantStyles[variant] }}>
      {children}
    </span>
  );
}

const styles = {
  badge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    fontFamily: "'DM Mono', 'Courier New', monospace",
    letterSpacing: "0.03em",
    whiteSpace: "nowrap",
  },
};