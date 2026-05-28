import { useState } from "react";

const MOODS = [
  {
    id: "radiant",
    label: "Radiant",
    emoji: "✨",
    color: "#f59e0b",
    bg: "#fffbeb",
    accent: "#fde68a",
    text: "#92400e",
    desc: "Everything feels luminous today.",
    gradient: "linear-gradient(135deg, #fef3c7, #fde68a, #fcd34d)",
  },
  {
    id: "joyful",
    label: "Joyful",
    emoji: "🌸",
    color: "#ec4899",
    bg: "#fdf2f8",
    accent: "#fbcfe8",
    text: "#831843",
    desc: "Warm and bright inside.",
    gradient: "linear-gradient(135deg, #fce7f3, #fbcfe8, #f9a8d4)",
  },
  {
    id: "calm",
    label: "Calm",
    emoji: "🌿",
    color: "#10b981",
    bg: "#ecfdf5",
    accent: "#a7f3d0",
    text: "#064e3b",
    desc: "Still water, steady breath.",
    gradient: "linear-gradient(135deg, #d1fae5, #a7f3d0, #6ee7b7)",
  },
  {
    id: "focused",
    label: "Focused",
    emoji: "🔷",
    color: "#3b82f6",
    bg: "#eff6ff",
    accent: "#bfdbfe",
    text: "#1e3a8a",
    desc: "Clear mind, sharp edges.",
    gradient: "linear-gradient(135deg, #dbeafe, #bfdbfe, #93c5fd)",
  },
  {
    id: "tired",
    label: "Tired",
    emoji: "🌙",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    accent: "#ddd6fe",
    text: "#4c1d95",
    desc: "Running on fumes today.",
    gradient: "linear-gradient(135deg, #ede9fe, #ddd6fe, #c4b5fd)",
  },
  {
    id: "uneasy",
    label: "Uneasy",
    emoji: "🌧️",
    color: "#64748b",
    bg: "#f8fafc",
    accent: "#cbd5e1",
    text: "#0f172a",
    desc: "Clouds without a forecast.",
    gradient: "linear-gradient(135deg, #f1f5f9, #e2e8f0, #cbd5e1)",
  },
];

const LOG_LIMIT = 6;

export default function MoodTracker() {
  const [selected, setSelected] = useState(null);
  const [log, setLog] = useState([]);
  const [note, setNote] = useState("");

  const mood = MOODS.find((m) => m.id === selected);

  const logMood = () => {
    if (!selected) return;
    const entry = {
      id: Date.now(),
      mood: selected,
      note: note.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setLog((prev) => [entry, ...prev].slice(0, LOG_LIMIT));
    setNote("");
  };

  const bg = mood ? mood.bg : "#f9fafb";
  const accent = mood ? mood.color : "#94a3b8";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: mood ? mood.gradient : "linear-gradient(135deg, #f9fafb, #f1f5f9)",
        transition: "background 0.7s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        fontFamily: "'Lora', Georgia, serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        @keyframes popIn { from { transform: scale(0.85); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(12px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes floatEmoji { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .mood-chip:hover { transform: scale(1.06) translateY(-2px); }
        .log-card:first-child { animation: slideUp 0.35s ease both; }
      `}</style>

      <div style={{ width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 600, color: accent, margin: 0, transition: "color 0.5s", letterSpacing: "-0.02em" }}>
            {mood ? mood.label : "How are you?"}
          </h1>
          <p style={{ margin: "0.4rem 0 0", fontSize: "0.95rem", fontStyle: "italic", color: mood ? mood.text : "#64748b", opacity: 0.8, transition: "all 0.5s" }}>
            {mood ? mood.desc : "Pick the feeling closest to now."}
          </p>
        </div>

        {/* Emoji display */}
        <div style={{ textAlign: "center", height: "4rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {mood ? (
            <span key={mood.id} style={{ fontSize: "3rem", lineHeight: 1, animation: "floatEmoji 3s ease-in-out infinite, popIn 0.4s ease" }}>
              {mood.emoji}
            </span>
          ) : (
            <span style={{ fontSize: "2rem", opacity: 0.25 }}>◌</span>
          )}
        </div>

        {/* Mood chips */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.6rem" }}>
          {MOODS.map((m) => {
            const isActive = selected === m.id;
            return (
              <button
                key={m.id}
                className="mood-chip"
                onClick={() => setSelected(isActive ? null : m.id)}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  gap: "0.25rem", padding: "0.75rem 0.5rem",
                  background: isActive ? m.color : "rgba(255,255,255,0.7)",
                  border: `2px solid ${isActive ? m.color : "rgba(0,0,0,0.06)"}`,
                  borderRadius: "1rem", cursor: "pointer",
                  transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                  boxShadow: isActive ? `0 4px 16px ${m.color}44` : "none",
                }}
              >
                <span style={{ fontSize: "1.4rem" }}>{m.emoji}</span>
                <span style={{ fontSize: "0.72rem", fontWeight: 500, color: isActive ? "#fff" : "#475569", letterSpacing: "0.04em", fontFamily: "'DM Mono', monospace" }}>
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Note + Log button */}
        {mood && (
          <div key={mood.id} style={{ animation: "slideUp 0.3s ease both", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Add a note… (optional)"
              rows={2}
              style={{
                width: "100%", border: `1.5px solid ${mood.accent}`,
                borderRadius: "0.75rem", padding: "0.65rem 0.85rem",
                fontSize: "0.875rem", fontFamily: "'Lora', serif",
                background: "rgba(255,255,255,0.8)", color: "#1e293b",
                resize: "none", outline: "none", transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = mood.color}
              onBlur={e => e.target.style.borderColor = mood.accent}
            />
            <button
              onClick={logMood}
              style={{
                width: "100%", padding: "0.7rem",
                background: mood.color, color: "#fff",
                border: "none", borderRadius: "0.75rem",
                fontSize: "0.9rem", fontWeight: 600, cursor: "pointer",
                fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em",
                boxShadow: `0 4px 14px ${mood.color}55`,
                transition: "opacity 0.2s, transform 0.15s",
              }}
              onMouseEnter={e => { e.target.style.opacity = "0.88"; e.target.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.target.style.opacity = "1"; e.target.style.transform = "none"; }}
            >
              Log this mood →
            </button>
          </div>
        )}

        {/* Log history */}
        {log.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <p style={{ fontSize: "0.72rem", color: "#94a3b8", letterSpacing: "0.08em", fontFamily: "'DM Mono', monospace", margin: 0 }}>
              RECENT LOG
            </p>
            {log.map((entry) => {
              const m = MOODS.find(x => x.id === entry.mood);
              return (
                <div
                  key={entry.id}
                  className="log-card"
                  style={{
                    display: "flex", alignItems: "flex-start", gap: "0.75rem",
                    background: "rgba(255,255,255,0.75)",
                    borderRadius: "0.75rem", padding: "0.6rem 0.85rem",
                    border: "1px solid rgba(0,0,0,0.05)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <span style={{ fontSize: "1.1rem", flexShrink: 0, marginTop: "1px" }}>{m?.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.82rem", fontWeight: 600, color: m?.color }}>{m?.label}</span>
                      <span style={{ fontSize: "0.7rem", color: "#94a3b8", fontFamily: "'DM Mono', monospace" }}>{entry.time}</span>
                    </div>
                    {entry.note && (
                      <p style={{ fontSize: "0.8rem", color: "#475569", margin: "0.15rem 0 0", fontStyle: "italic", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        "{entry.note}"
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}