// Assignment 12/03/2026 - Smart Signup Form
// Validations: email format, password strength

import { useState } from "react";

function getPasswordStrength(password) {
  if (password.length === 0) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: "Weak", color: "#ef4444" };
  if (score === 2) return { score, label: "Fair", color: "#f97316" };
  if (score === 3) return { score, label: "Good", color: "#eab308" };
  return { score, label: "Strong", color: "#22c55e" };
}

export default function SignupForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const strength = getPasswordStrength(form.password);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email address.";
    }
    if (!form.password) {
      errs.password = "Password is required.";
    } else if (form.password.length < 8) {
      errs.password = "Password must be at least 8 characters.";
    } else if (strength.score < 2) {
      errs.password = "Password is too weak.";
    }
    if (!form.confirm) {
      errs.confirm = "Please confirm your password.";
    } else if (form.confirm !== form.password) {
      errs.confirm = "Passwords do not match.";
    }
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "0.65rem 0.85rem",
    border: `1px solid ${errors[field] ? "#ef4444" : "#d1d5db"}`,
    borderRadius: "0.5rem",
    fontSize: "0.95rem",
    outline: "none",
    marginTop: "0.3rem",
    boxSizing: "border-box",
  });

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
        <div style={{ background: "#fff", padding: "2.5rem", borderRadius: "1rem", border: "1px solid #e2e8f0", textAlign: "center", maxWidth: "360px", width: "100%" }}>
          <div style={{ fontSize: "3rem" }}>✅</div>
          <h2 style={{ margin: "0.75rem 0 0.3rem", color: "#1e293b" }}>Account Created!</h2>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Welcome, {form.name}!</p>
          <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", password: "", confirm: "" }); }}
            style={{ marginTop: "1.25rem", padding: "0.6rem 1.5rem", background: "#1e293b", color: "#fff", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.9rem" }}>
            Sign up again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", fontFamily: "system-ui, sans-serif" }}>
      <form onSubmit={handleSubmit} style={{ background: "#fff", padding: "2rem", borderRadius: "1rem", border: "1px solid #e2e8f0", width: "100%", maxWidth: "380px" }}>
        <h2 style={{ margin: "0 0 1.5rem", fontSize: "1.4rem", color: "#1e293b", fontWeight: 600 }}>Create Account</h2>

        {/* Name */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontSize: "0.85rem", fontWeight: 500, color: "#374151" }}>Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" style={inputStyle("name")} />
          {errors.name && <p style={{ color: "#ef4444", fontSize: "0.78rem", margin: "0.25rem 0 0" }}>{errors.name}</p>}
        </div>

        {/* Email */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontSize: "0.85rem", fontWeight: 500, color: "#374151" }}>Email</label>
          <input name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" style={inputStyle("email")} />
          {errors.email && <p style={{ color: "#ef4444", fontSize: "0.78rem", margin: "0.25rem 0 0" }}>{errors.email}</p>}
        </div>

        {/* Password */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontSize: "0.85rem", fontWeight: 500, color: "#374151" }}>Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Min. 8 characters" style={inputStyle("password")} />
          {/* Strength bar */}
          {form.password.length > 0 && (
            <div style={{ marginTop: "0.4rem" }}>
              <div style={{ display: "flex", gap: "4px" }}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} style={{ flex: 1, height: "4px", borderRadius: "2px", background: i <= strength.score ? strength.color : "#e2e8f0", transition: "background 0.3s" }} />
                ))}
              </div>
              <p style={{ fontSize: "0.75rem", color: strength.color, margin: "0.2rem 0 0", fontWeight: 500 }}>{strength.label}</p>
            </div>
          )}
          {errors.password && <p style={{ color: "#ef4444", fontSize: "0.78rem", margin: "0.25rem 0 0" }}>{errors.password}</p>}
          <ul style={{ fontSize: "0.75rem", color: "#94a3b8", margin: "0.3rem 0 0", paddingLeft: "1.1rem" }}>
            <li style={{ color: form.password.length >= 8 ? "#22c55e" : "#94a3b8" }}>At least 8 characters</li>
            <li style={{ color: /[A-Z]/.test(form.password) ? "#22c55e" : "#94a3b8" }}>One uppercase letter</li>
            <li style={{ color: /[0-9]/.test(form.password) ? "#22c55e" : "#94a3b8" }}>One number</li>
            <li style={{ color: /[^A-Za-z0-9]/.test(form.password) ? "#22c55e" : "#94a3b8" }}>One special character</li>
          </ul>
        </div>

        {/* Confirm Password */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ fontSize: "0.85rem", fontWeight: 500, color: "#374151" }}>Confirm Password</label>
          <input name="confirm" type="password" value={form.confirm} onChange={handleChange} placeholder="Re-enter password" style={inputStyle("confirm")} />
          {errors.confirm && <p style={{ color: "#ef4444", fontSize: "0.78rem", margin: "0.25rem 0 0" }}>{errors.confirm}</p>}
        </div>

        <button type="submit" style={{ width: "100%", padding: "0.7rem", background: "#1e293b", color: "#fff", border: "none", borderRadius: "0.5rem", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer" }}>
          Sign Up
        </button>
      </form>
    </div>
  );
}