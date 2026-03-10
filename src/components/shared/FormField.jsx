export default function FormField({ label, error, required, children, hint }) {
  return (
    <div style={styles.wrapper}>
      {label && (
        <label style={styles.label}>
          {label}
          {required && <span style={styles.required}>*</span>}
        </label>
      )}
      {children}
      {hint && !error && <p style={styles.hint}>{hint}</p>}
      {error && <p style={styles.error}>⚠ {error}</p>}
    </div>
  );
}

export function Input({ error, ...props }) {
  return (
    <input
      style={{
        ...styles.input,
        ...(error ? styles.inputError : {}),
      }}
      {...props}
    />
  );
}

export function Textarea({ error, rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      style={{
        ...styles.input,
        ...styles.textarea,
        ...(error ? styles.inputError : {}),
      }}
      {...props}
    />
  );
}

export function Select({ error, children, ...props }) {
  return (
    <select
      style={{
        ...styles.input,
        ...styles.select,
        ...(error ? styles.inputError : {}),
      }}
      {...props}
    >
      {children}
    </select>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    fontWeight: "600",
    color: "rgba(255,255,255,0.7)",
    letterSpacing: "0.02em",
    textTransform: "uppercase",
  },
  required: {
    color: "#f87171",
    marginLeft: "3px",
  },
  input: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "10px",
    padding: "11px 14px",
    color: "#fff",
    fontSize: "15px",
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    transition: "border-color 0.15s",
    width: "100%",
    boxSizing: "border-box",
  },
  inputError: {
    borderColor: "rgba(239,68,68,0.5)",
  },
  textarea: {
    resize: "vertical",
    lineHeight: "1.6",
  },
  select: {
    cursor: "pointer",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(255,255,255,0.4)' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
  },
  hint: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.35)",
    fontFamily: "'DM Sans', sans-serif",
    margin: 0,
  },
  error: {
    fontSize: "12px",
    color: "#f87171",
    fontFamily: "'DM Sans', sans-serif",
    margin: 0,
  },
};