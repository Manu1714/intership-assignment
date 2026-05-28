import { useState, useRef, useEffect } from "react";

const FILTERS = ["All", "Active", "Done"];

const COLORS = ["#e11d48", "#f97316", "#eab308", "#16a34a", "#0284c7", "#7c3aed", "#db2777"];

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function useLocalTasks() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Read 20 pages", done: false, color: "#0284c7", pinned: false },
    { id: 2, text: "Morning run", done: true, color: "#16a34a", pinned: false },
    { id: 3, text: "Write lecture notes", done: false, color: "#7c3aed", pinned: false },
  ]);
  return [tasks, setTasks];
}

export default function DynamicListApp() {
  const [tasks, setTasks] = useLocalTasks();
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const inputRef = useRef(null);
  const editRef = useRef(null);

  useEffect(() => { if (editId && editRef.current) editRef.current.focus(); }, [editId]);

  const addTask = () => {
    const text = input.trim();
    if (!text) return;
    setTasks(prev => [
      { id: Date.now(), text, done: false, color: randomColor(), pinned: false },
      ...prev,
    ]);
    setInput("");
    inputRef.current?.focus();
  };

  const toggleDone = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const deleteTask = (id) => setTasks(prev => prev.filter(t => t.id !== id));
  const togglePin = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, pinned: !t.pinned } : t));

  const saveEdit = (id) => {
    const text = editText.trim();
    if (text) setTasks(prev => prev.map(t => t.id === id ? { ...t, text } : t));
    setEditId(null);
  };

  const clearDone = () => setTasks(prev => prev.filter(t => !t.done));

  const visible = tasks
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
    .filter(t => filter === "All" ? true : filter === "Active" ? !t.done : t.done);

  const doneCount = tasks.filter(t => t.done).length;
  const progress = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "2rem 1rem",
      fontFamily: "'Syne', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        @keyframes slideIn { from { transform: translateX(-12px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeOut { to { opacity: 0; transform: scale(0.95); } }
        .task-row { animation: slideIn 0.25s ease both; }
        .task-row:hover .task-actions { opacity: 1 !important; }
        .task-row:hover { background: #1a1a1a !important; }
        input::placeholder { color: #555; }
        textarea:focus, input:focus { outline: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
      `}</style>

      <div style={{ width: "100%", maxWidth: "460px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        {/* Header */}
        <div>
          <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.04em", lineHeight: 1 }}>
            Task List
          </h1>
          <p style={{ margin: "0.4rem 0 0", fontSize: "0.8rem", color: "#555", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.04em" }}>
            {doneCount}/{tasks.length} COMPLETED
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ height: "3px", background: "#1e1e1e", borderRadius: "2px", overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${progress}%`,
            background: "linear-gradient(90deg, #7c3aed, #e11d48)",
            borderRadius: "2px", transition: "width 0.5s ease",
          }} />
        </div>

        {/* Input */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addTask()}
            placeholder="New task…"
            style={{
              flex: 1, background: "#111", border: "1px solid #2a2a2a",
              borderRadius: "0.6rem", padding: "0.65rem 1rem",
              color: "#fff", fontSize: "0.9rem", fontFamily: "'Syne', sans-serif",
              transition: "border-color 0.2s",
            }}
            onFocus={e => e.target.style.borderColor = "#444"}
            onBlur={e => e.target.style.borderColor = "#2a2a2a"}
          />
          <button
            onClick={addTask}
            style={{
              background: "#fff", color: "#0a0a0a", border: "none",
              borderRadius: "0.6rem", padding: "0.65rem 1.1rem",
              fontSize: "1.1rem", cursor: "pointer", fontWeight: 700,
              transition: "transform 0.15s, background 0.15s",
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.target.style.background = "#e2e8f0"; e.target.style.transform = "scale(1.05)"; }}
            onMouseLeave={e => { e.target.style.background = "#fff"; e.target.style.transform = "none"; }}
          >
            +
          </button>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: "0.35rem" }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "0.35rem 0.85rem", borderRadius: "2rem",
                fontSize: "0.75rem", fontWeight: filter === f ? 700 : 400,
                fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.04em",
                background: filter === f ? "#fff" : "transparent",
                color: filter === f ? "#0a0a0a" : "#555",
                border: `1px solid ${filter === f ? "#fff" : "#2a2a2a"}`,
                cursor: "pointer", transition: "all 0.2s",
              }}
            >
              {f}
            </button>
          ))}
          {doneCount > 0 && (
            <button
              onClick={clearDone}
              style={{
                marginLeft: "auto", padding: "0.35rem 0.85rem", borderRadius: "2rem",
                fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace",
                background: "transparent", color: "#e11d48",
                border: "1px solid #3a1a1a", cursor: "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={e => e.target.style.background = "#1a0a0a"}
              onMouseLeave={e => e.target.style.background = "transparent"}
            >
              Clear done
            </button>
          )}
        </div>

        {/* Task list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", maxHeight: "50vh", overflowY: "auto" }}>
          {visible.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2.5rem 0", color: "#333" }}>
              <p style={{ fontSize: "1.5rem", margin: "0 0 0.5rem" }}>·</p>
              <p style={{ fontSize: "0.85rem", margin: 0 }}>Nothing here</p>
            </div>
          ) : (
            visible.map(task => (
              <div
                key={task.id}
                className="task-row"
                style={{
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  padding: "0.7rem 0.85rem", borderRadius: "0.6rem",
                  background: "#111", border: "1px solid #1e1e1e",
                  transition: "background 0.15s",
                  position: "relative",
                }}
              >
                {/* Color dot / done toggle */}
                <button
                  onClick={() => toggleDone(task.id)}
                  style={{
                    width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0,
                    background: task.done ? task.color : "transparent",
                    border: `2px solid ${task.color}`,
                    cursor: "pointer", transition: "background 0.2s",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  {task.done && (
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 2.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>

                {/* Text / edit */}
                {editId === task.id ? (
                  <input
                    ref={editRef}
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") saveEdit(task.id); if (e.key === "Escape") setEditId(null); }}
                    onBlur={() => saveEdit(task.id)}
                    style={{
                      flex: 1, background: "transparent", border: "none",
                      color: "#fff", fontSize: "0.9rem", fontFamily: "'Syne', sans-serif",
                      borderBottom: "1px solid #444",
                    }}
                  />
                ) : (
                  <span
                    onDoubleClick={() => { setEditId(task.id); setEditText(task.text); }}
                    style={{
                      flex: 1, fontSize: "0.9rem", color: task.done ? "#444" : "#d1d5db",
                      textDecoration: task.done ? "line-through" : "none",
                      transition: "color 0.2s", cursor: "default",
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}
                  >
                    {task.pinned && <span style={{ color: "#eab308", marginRight: "0.4rem", fontSize: "0.75rem" }}>📌</span>}
                    {task.text}
                  </span>
                )}

                {/* Actions */}
                <div
                  className="task-actions"
                  style={{ display: "flex", gap: "4px", opacity: 0, transition: "opacity 0.15s", flexShrink: 0 }}
                >
                  <button
                    onClick={() => togglePin(task.id)}
                    title="Pin"
                    style={{ background: "none", border: "none", cursor: "pointer", color: task.pinned ? "#eab308" : "#444", fontSize: "0.75rem", padding: "2px 4px" }}
                  >
                    📌
                  </button>
                  <button
                    onClick={() => { setEditId(task.id); setEditText(task.text); }}
                    title="Edit"
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#555", padding: "2px 4px", transition: "color 0.15s" }}
                    onMouseEnter={e => e.target.style.color = "#aaa"}
                    onMouseLeave={e => e.target.style.color = "#555"}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4z"/></svg>
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    title="Delete"
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#555", padding: "2px 4px", transition: "color 0.15s" }}
                    onMouseEnter={e => e.target.style.color = "#e11d48"}
                    onMouseLeave={e => e.target.style.color = "#555"}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer hint */}
        <p style={{ fontSize: "0.7rem", color: "#333", fontFamily: "'JetBrains Mono', monospace", textAlign: "center", margin: 0 }}>
          double-click to edit · hover for actions
        </p>
      </div>
    </div>
  );
}