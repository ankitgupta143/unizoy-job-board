import { useState } from "react";

export default function Navbar({ currentView, onNavigate, isAdmin, onToggleAdmin }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        {/* Logo */}
        <button style={styles.logo} onClick={() => onNavigate("home")}>
          <span style={styles.logoMark}>U</span>
          <span style={styles.logoText}>nizoy</span>
          <span style={styles.logoTag}>Jobs</span>
        </button>

        {/* Desktop links */}
        <div style={styles.links}>
          <NavLink active={currentView === "home"} onClick={() => onNavigate("home")}>
            Browse Jobs
          </NavLink>
          {isAdmin && (
            <>
              <NavLink active={currentView === "admin-post"} onClick={() => onNavigate("admin-post")}>
                Post a Job
              </NavLink>
              <NavLink active={currentView === "admin-board"} onClick={() => onNavigate("admin-board")}>
                Manage Jobs
              </NavLink>
            </>
          )}
        </div>

        {/* Admin toggle */}
        <div style={styles.right}>
          <button
            style={{ ...styles.adminBtn, ...(isAdmin ? styles.adminBtnActive : {}) }}
            onClick={onToggleAdmin}
          >
            {isAdmin ? "👤 Admin Mode" : "Switch to Admin"}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button style={styles.hamburger} onClick={() => setMobileOpen((o) => !o)}>
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={styles.mobileMenu}>
          <MobileLink onClick={() => { onNavigate("home"); setMobileOpen(false); }}>Browse Jobs</MobileLink>
          {isAdmin && (
            <>
              <MobileLink onClick={() => { onNavigate("admin-post"); setMobileOpen(false); }}>Post a Job</MobileLink>
              <MobileLink onClick={() => { onNavigate("admin-board"); setMobileOpen(false); }}>Manage Jobs</MobileLink>
            </>
          )}
          <button style={styles.mobileAdminBtn} onClick={() => { onToggleAdmin(); setMobileOpen(false); }}>
            {isAdmin ? "Exit Admin Mode" : "Enter Admin Mode"}
          </button>
        </div>
      )}
    </nav>
  );
}

function NavLink({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ ...styles.navLink, ...(active ? styles.navLinkActive : {}) }}
    >
      {children}
    </button>
  );
}

function MobileLink({ children, onClick }) {
  return (
    <button onClick={onClick} style={styles.mobileLink}>
      {children}
    </button>
  );
}

const styles = {
  nav: {
    background: "#0a0a0f",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    backdropFilter: "blur(12px)",
  },
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    height: "64px",
    display: "flex",
    alignItems: "center",
    gap: "32px",
  },
  logo: {
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "2px",
    textDecoration: "none",
    flexShrink: 0,
  },
  logoMark: {
    background: "linear-gradient(135deg, #6366f1, #a78bfa)",
    color: "#fff",
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Playfair Display', Georgia, serif",
    fontWeight: "700",
    fontSize: "18px",
    marginRight: "6px",
  },
  logoText: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontWeight: "700",
    fontSize: "20px",
    color: "#fff",
    letterSpacing: "-0.5px",
  },
  logoTag: {
    fontSize: "11px",
    color: "#6366f1",
    fontFamily: "'DM Mono', 'Courier New', monospace",
    fontWeight: "500",
    letterSpacing: "0.05em",
    marginLeft: "6px",
    background: "rgba(99,102,241,0.15)",
    padding: "2px 6px",
    borderRadius: "4px",
    border: "1px solid rgba(99,102,241,0.3)",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    flex: 1,
  },
  navLink: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "6px 14px",
    borderRadius: "8px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    fontWeight: "500",
    color: "rgba(255,255,255,0.6)",
    transition: "all 0.15s ease",
  },
  navLinkActive: {
    color: "#fff",
    background: "rgba(99,102,241,0.15)",
  },
  right: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  adminBtn: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "8px",
    padding: "8px 16px",
    color: "rgba(255,255,255,0.7)",
    fontSize: "13px",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.15s",
    whiteSpace: "nowrap",
  },
  adminBtnActive: {
    background: "rgba(99,102,241,0.2)",
    border: "1px solid rgba(99,102,241,0.5)",
    color: "#a78bfa",
  },
  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
  },
  mobileMenu: {
    background: "#0f0f1a",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    padding: "12px 24px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  mobileLink: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "10px 14px",
    borderRadius: "8px",
    textAlign: "left",
    color: "rgba(255,255,255,0.7)",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
  },
  mobileAdminBtn: {
    marginTop: "8px",
    background: "rgba(99,102,241,0.15)",
    border: "1px solid rgba(99,102,241,0.3)",
    borderRadius: "8px",
    padding: "10px 14px",
    color: "#a78bfa",
    fontSize: "14px",
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    textAlign: "left",
  },
};