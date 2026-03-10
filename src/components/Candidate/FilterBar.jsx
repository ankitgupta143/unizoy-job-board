import { departments, jobTypes } from "../../data/mockData";

export default function FilterBar({ filters, onChange, totalJobs }) {
  function update(key, value) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.left}>
        <input
          style={styles.search}
          placeholder="🔍  Search jobs, skills, departments…"
          value={filters.query}
          onChange={(e) => update("query", e.target.value)}
        />
      </div>
      <div style={styles.right}>
        <FilterSelect
          value={filters.department}
          onChange={(v) => update("department", v)}
          options={departments}
          label="Dept"
        />
        <FilterSelect
          value={filters.type}
          onChange={(v) => update("type", v)}
          options={["All", ...jobTypes]}
          label="Type"
        />
        <span style={styles.count}>{totalJobs} roles</span>
      </div>
    </div>
  );
}

function FilterSelect({ value, onChange, options, label }) {
  return (
    <div style={styles.selectWrap}>
      <span style={styles.selectLabel}>{label}</span>
      <select
        style={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
    padding: "16px 0",
  },
  left: { flex: 1, minWidth: "240px" },
  search: {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "11px 16px",
    color: "#fff",
    fontSize: "14px",
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    boxSizing: "border-box",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  selectWrap: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    padding: "6px 12px",
  },
  selectLabel: {
    fontSize: "11px",
    fontFamily: "'DM Mono', monospace",
    fontWeight: "600",
    color: "rgba(255,255,255,0.35)",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  select: {
    background: "none",
    border: "none",
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    outline: "none",
    padding: "0 2px",
  },
  count: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "12px",
    color: "rgba(255,255,255,0.3)",
    whiteSpace: "nowrap",
    padding: "0 4px",
  },
};