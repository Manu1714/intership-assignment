// Assignment 11/03/2026 - Multi-Page App
// Run: npm install react-router-dom

import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];
  return (
    <nav style={{ background: "#1e293b", padding: "1rem 2rem", display: "flex", gap: "1.5rem", alignItems: "center" }}>
      <span style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem", marginRight: "auto" }}>MyApp</span>
      {links.map(link => (
        <Link
          key={link.to}
          to={link.to}
          style={{
            color: location.pathname === link.to ? "#38bdf8" : "#94a3b8",
            textDecoration: "none",
            fontWeight: location.pathname === link.to ? 600 : 400,
            fontSize: "0.95rem",
          }}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

function Home() {
  return (
    <div style={{ padding: "3rem 2rem" }}>
      <h1 style={{ fontSize: "2rem", color: "#1e293b" }}>Welcome Home</h1>
      <p style={{ color: "#64748b", marginTop: "0.5rem" }}>This is the Home page.</p>
    </div>
  );
}

function About() {
  return (
    <div style={{ padding: "3rem 2rem" }}>
      <h1 style={{ fontSize: "2rem", color: "#1e293b" }}>About</h1>
      <p style={{ color: "#64748b", marginTop: "0.5rem" }}>This is the About page.</p>
    </div>
  );
}

function Contact() {
  return (
    <div style={{ padding: "3rem 2rem" }}>
      <h1 style={{ fontSize: "2rem", color: "#1e293b" }}>Contact</h1>
      <p style={{ color: "#64748b", marginTop: "0.5rem" }}>This is the Contact page.</p>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ padding: "3rem 2rem" }}>
      <h1 style={{ fontSize: "2rem", color: "#ef4444" }}>404 - Page Not Found</h1>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}