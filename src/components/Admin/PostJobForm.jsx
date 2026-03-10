import { useState } from "react";
import FormField, { Input, Textarea, Select } from "../shared/FormField";
import { departments, jobTypes, locations } from "../../data/mockData";
import Badge from "../shared/Badge";

const INITIAL = {
  title: "",
  department: departments[1],
  location: locations[0],
  type: jobTypes[0],
  salary: "",
  description: "",
  requirements: [""],
};

export default function PostJobForm({ onSubmit, onCancel, editJob }) {
  const [form, setForm] = useState(editJob || INITIAL);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function setField(key, val) {
    setForm((p) => ({ ...p, [key]: val }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  }

  function setReq(idx, val) {
    const reqs = [...form.requirements];
    reqs[idx] = val;
    setForm((p) => ({ ...p, requirements: reqs }));
  }

  function addReq() {
    setForm((p) => ({ ...p, requirements: [...p.requirements, ""] }));
  }

  function removeReq(idx) {
    if (form.requirements.length === 1) return;
    setForm((p) => ({
      ...p,
      requirements: p.requirements.filter((_, i) => i !== idx),
    }));
  }

  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = "Job title is required";
    if (!form.salary.trim()) e.salary = "Salary range is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (form.requirements.some((r) => !r.trim()))
      e.requirements = "Remove empty requirements or fill them in";
    return e;
  }

  async function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    onSubmit(form);
    setSaved(true);
    setSaving(false);
    setTimeout(() => {
      setSaved(false);
      if (!editJob) setForm(INITIAL);
    }, 2000);
  }

  return (
    <div style={styles.wrapper}>
      {/* Preview tag */}
      {saved && (
        <div style={styles.toast}>✅ Job {editJob ? "updated" : "posted"} successfully!</div>
      )}

      <div style={styles.grid}>
        {/* Left column */}
        <div style={styles.col}>
          <FormField label="Job Title" required error={errors.title}>
            <Input
              placeholder="e.g. Senior Backend Engineer"
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              error={errors.title}
            />
          </FormField>

          <div style={styles.row}>
            <FormField label="Department" required>
              <Select value={form.department} onChange={(e) => setField("department", e.target.value)}>
                {departments.slice(1).map((d) => <option key={d}>{d}</option>)}
              </Select>
            </FormField>
            <FormField label="Job Type" required>
              <Select value={form.type} onChange={(e) => setField("type", e.target.value)}>
                {jobTypes.map((t) => <option key={t}>{t}</option>)}
              </Select>
            </FormField>
          </div>

          <div style={styles.row}>
            <FormField label="Location" required>
              <Select value={form.location} onChange={(e) => setField("location", e.target.value)}>
                {locations.map((l) => <option key={l}>{l}</option>)}
              </Select>
            </FormField>
            <FormField label="Salary Range" required error={errors.salary}>
              <Input
                placeholder="e.g. $90k – $120k"
                value={form.salary}
                onChange={(e) => setField("salary", e.target.value)}
                error={errors.salary}
              />
            </FormField>
          </div>

          <FormField label="Job Description" required error={errors.description}>
            <Textarea
              placeholder="Describe the role, responsibilities, and team…"
              rows={6}
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              error={errors.description}
            />
          </FormField>
        </div>

        {/* Right column – requirements */}
        <div style={styles.col}>
          <FormField label="Requirements" required error={errors.requirements}>
            <div style={styles.reqList}>
              {form.requirements.map((req, i) => (
                <div key={i} style={styles.reqRow}>
                  <input
                    style={styles.reqInput}
                    placeholder={`Requirement ${i + 1}`}
                    value={req}
                    onChange={(e) => setReq(i, e.target.value)}
                  />
                  <button
                    style={styles.reqRemove}
                    onClick={() => removeReq(i)}
                    disabled={form.requirements.length === 1}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button style={styles.addReqBtn} onClick={addReq}>
                + Add Requirement
              </button>
            </div>
          </FormField>

          {/* Preview card */}
          <div style={styles.preview}>
            <p style={styles.previewLabel}>Live Preview</p>
            <div style={styles.previewCard}>
              <div style={styles.previewDept}>
                {form.department || "Department"}
              </div>
              <div style={styles.previewTitle}>
                {form.title || "Job Title"}
              </div>
              <div style={styles.previewRow}>
                <span>📍 {form.location}</span>
                <span>💰 {form.salary || "Salary"}</span>
              </div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "8px" }}>
                <Badge variant="green">{form.type}</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.actions}>
        {onCancel && (
          <button style={styles.cancelBtn} onClick={onCancel} disabled={saving}>
            Cancel
          </button>
        )}
        <button
          style={{ ...styles.submitBtn, ...(saving ? styles.btnLoading : {}) }}
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving ? "Saving…" : editJob ? "Update Job" : "Post Job →"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { display: "flex", flexDirection: "column", gap: "24px", position: "relative" },
  toast: {
    position: "fixed",
    top: "80px",
    right: "24px",
    background: "rgba(34,197,94,0.15)",
    border: "1px solid rgba(34,197,94,0.4)",
    borderRadius: "10px",
    padding: "12px 20px",
    color: "#4ade80",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    fontWeight: "600",
    zIndex: 2000,
    backdropFilter: "blur(8px)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
  },
  col: { display: "flex", flexDirection: "column", gap: "16px" },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
  reqList: { display: "flex", flexDirection: "column", gap: "8px" },
  reqRow: { display: "flex", gap: "8px", alignItems: "center" },
  reqInput: {
    flex: 1,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "8px",
    padding: "9px 12px",
    color: "#fff",
    fontSize: "14px",
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
  },
  reqRemove: {
    background: "rgba(239,68,68,0.1)",
    border: "1px solid rgba(239,68,68,0.2)",
    borderRadius: "8px",
    width: "32px",
    height: "34px",
    color: "#f87171",
    cursor: "pointer",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  addReqBtn: {
    background: "none",
    border: "1px dashed rgba(99,102,241,0.4)",
    borderRadius: "8px",
    padding: "8px",
    color: "#6366f1",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    textAlign: "center",
  },
  preview: { display: "flex", flexDirection: "column", gap: "8px" },
  previewLabel: {
    fontSize: "11px",
    fontFamily: "'DM Mono', monospace",
    color: "rgba(255,255,255,0.3)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    margin: 0,
  },
  previewCard: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  previewDept: {
    fontSize: "11px",
    fontFamily: "'DM Mono', monospace",
    color: "#6366f1",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: "600",
  },
  previewTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "18px",
    fontWeight: "700",
    color: "#fff",
  },
  previewRow: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    fontSize: "13px",
    color: "rgba(255,255,255,0.5)",
    fontFamily: "'DM Sans', sans-serif",
  },
  actions: { display: "flex", gap: "12px", justifyContent: "flex-end", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px" },
  cancelBtn: {
    background: "none",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "10px",
    padding: "11px 24px",
    color: "rgba(255,255,255,0.5)",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    cursor: "pointer",
  },
  submitBtn: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    border: "none",
    borderRadius: "10px",
    padding: "11px 28px",
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
  },
  btnLoading: { opacity: 0.7, cursor: "not-allowed" },
};