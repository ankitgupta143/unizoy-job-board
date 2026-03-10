import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children, width = "560px" }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        style={{ ...styles.modal, maxWidth: width }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.header}>
          <h2 style={styles.title}>{title}</h2>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        <div style={styles.body}>{children}</div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.75)",
    backdropFilter: "blur(4px)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  },
  modal: {
    background: "#13131f",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    width: "100%",
    maxHeight: "90vh",
    overflow: "auto",
    boxShadow: "0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1)",
    animation: "modalIn 0.2s ease",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "24px 28px 0",
  },
  title: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "22px",
    fontWeight: "700",
    color: "#fff",
    margin: 0,
  },
  closeBtn: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "rgba(255,255,255,0.5)",
    fontSize: "14px",
    flexShrink: 0,
  },
  body: {
    padding: "20px 28px 28px",
  },
};