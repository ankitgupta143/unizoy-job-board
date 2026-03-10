import { useState } from "react";
import FormField, { Input, Textarea } from "../shared/FormField";
import { validateEmail, validateUrl } from "../../utils/helpers";

const INITIAL = { name: "", email: "", resumeLink: "", coverNote: "" };

export default function ApplicationForm({ job, onSubmit, onCancel }) {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!validateEmail(form.email)) e.email = "Enter a valid email";
    if (!form.resumeLink.trim()) e.resumeLink = "Resume link is required";
    else if (!validateUrl(form.resumeLink)) e.resumeLink = "Enter a valid URL (e.g. https://…)";
    return e;
  }

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900)); // simulate API
    onSubmit(form);
    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div style={styles.success}>
        <div style={styles.successIcon}>🎉</div>
        <h3 style={styles.successTitle}>Application Submitted!</h3>
        <p style={styles.successText}>
          Thanks, <strong>{form.name}</strong>! Your application for{" "}
          <strong>{job.title}</strong> has been received. We'll be in touch at{" "}
          <strong>{form.email}</strong>.
        </p>
        <button style={styles.doneBtn} onClick={onCancel}>
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.jobMeta}>
        <span style={styles.jobTitle}>{job.title}</span>
        <span style={styles.jobLoc}>📍 {job.location}</span>
      </div>

      <div style={styles.form}>
        <FormField label="Full Name" required error={errors.name}>
          <Input
            placeholder="Jane Smith"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={errors.name}
          />
        </FormField>

        <FormField label="Email Address" required error={errors.email}>
          <Input
            type="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={errors.email}
          />
        </FormField>

        <FormField
          label="Resume / Portfolio Link"
          required
          error={errors.resumeLink}
          hint="Link to your resume (Google Drive, Dropbox, LinkedIn, etc.)"
        >
          <Input
            type="url"
            placeholder="https://drive.google.com/…"
            value={form.resumeLink}
            onChange={(e) => handleChange("resumeLink", e.target.value)}
            error={errors.resumeLink}
          />
        </FormField>

        <FormField label="Cover Note" hint="Optional — tell us why you're a great fit">
          <Textarea
            placeholder="I'm excited about this role because…"
            rows={4}
            value={form.coverNote}
            onChange={(e) => handleChange("coverNote", e.target.value)}
          />
        </FormField>
      </div>

      <div style={styles.actions}>
        <button style={styles.cancelBtn} onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
        <button
          style={{ ...styles.submitBtn, ...(submitting ? styles.submitBtnLoading : {}) }}
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Submitting…" : "Submit Application →"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { display: "flex", flexDirection: "column", gap: "20px" },
  jobMeta: {
    background: "rgba(99,102,241,0.08)",
    border: "1px solid rgba(99,102,241,0.2)",
    borderRadius: "10px",
    padding: "12px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "8px",
  },
  jobTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontWeight: "700",
    color: "#a78bfa",
    fontSize: "15px",
  },
  jobLoc: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.45)",
    fontFamily: "'DM Sans', sans-serif",
  },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  actions: { display: "flex", gap: "12px", justifyContent: "flex-end", paddingTop: "4px" },
  cancelBtn: {
    background: "none",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "10px",
    padding: "10px 20px",
    color: "rgba(255,255,255,0.5)",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    cursor: "pointer",
  },
  submitBtn: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    border: "none",
    borderRadius: "10px",
    padding: "10px 24px",
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "opacity 0.15s",
  },
  submitBtnLoading: { opacity: 0.7, cursor: "not-allowed" },
  success: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    padding: "16px 0",
    textAlign: "center",
  },
  successIcon: { fontSize: "52px" },
  successTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "26px",
    fontWeight: "700",
    color: "#fff",
    margin: 0,
  },
  successText: {
    fontSize: "15px",
    color: "rgba(255,255,255,0.6)",
    fontFamily: "'DM Sans', sans-serif",
    lineHeight: "1.6",
    margin: 0,
    maxWidth: "400px",
  },
  doneBtn: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    border: "none",
    borderRadius: "10px",
    padding: "12px 28px",
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "8px",
  },
};