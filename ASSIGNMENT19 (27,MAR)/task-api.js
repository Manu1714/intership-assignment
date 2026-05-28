// Assignment 27/03/2026 - Task API
// CRUD APIs for a task manager — test using Postman
// Run: npm install express && node task-api.js

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// ── In-memory store ──────────────────────────────────────────
let tasks = [
  { id: 1, title: "Buy groceries",    description: "Milk, eggs, bread", status: "pending",     priority: "low",    createdAt: new Date().toISOString() },
  { id: 2, title: "Submit assignment", description: "Node.js task API",  status: "in-progress", priority: "high",   createdAt: new Date().toISOString() },
  { id: 3, title: "Read a book",      description: "Atomic Habits",      status: "completed",   priority: "medium", createdAt: new Date().toISOString() },
];
let nextId = 4;

// ── ROUTES ───────────────────────────────────────────────────

// GET all tasks  (optional filter: ?status=pending  ?priority=high)
app.get("/tasks", (req, res) => {
  let result = tasks;
  if (req.query.status)   result = result.filter(t => t.status   === req.query.status);
  if (req.query.priority) result = result.filter(t => t.priority === req.query.priority);
  res.json({ count: result.length, tasks: result });
});

// GET single task
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

// POST create task
app.post("/tasks", (req, res) => {
  const { title, description, priority } = req.body;
  if (!title) return res.status(400).json({ message: "title is required" });

  const validPriorities = ["low", "medium", "high"];
  if (priority && !validPriorities.includes(priority)) {
    return res.status(400).json({ message: "priority must be low, medium, or high" });
  }

  const task = {
    id: nextId++,
    title,
    description: description || "",
    status: "pending",
    priority: priority || "medium",
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT update task (title, description, status, priority)
app.put("/tasks/:id", (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Task not found" });

  const validStatuses   = ["pending", "in-progress", "completed"];
  const validPriorities = ["low", "medium", "high"];

  if (req.body.status && !validStatuses.includes(req.body.status)) {
    return res.status(400).json({ message: "status must be pending, in-progress, or completed" });
  }
  if (req.body.priority && !validPriorities.includes(req.body.priority)) {
    return res.status(400).json({ message: "priority must be low, medium, or high" });
  }

  tasks[index] = { ...tasks[index], ...req.body, id: tasks[index].id, createdAt: tasks[index].createdAt };
  res.json(tasks[index]);
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Task not found" });
  const deleted = tasks.splice(index, 1)[0];
  res.json({ message: "Task deleted", task: deleted });
});

// ── START ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Task API running at http://localhost:${PORT}`);
  console.log("\nRoutes to test in Postman:");
  console.log("  GET    http://localhost:3000/tasks");
  console.log("  GET    http://localhost:3000/tasks?status=pending");
  console.log("  GET    http://localhost:3000/tasks?priority=high");
  console.log("  GET    http://localhost:3000/tasks/:id");
  console.log("  POST   http://localhost:3000/tasks");
  console.log('         Body: { "title": "New Task", "description": "...", "priority": "high" }');
  console.log("  PUT    http://localhost:3000/tasks/:id");
  console.log('         Body: { "status": "completed" }');
  console.log("  DELETE http://localhost:3000/tasks/:id");
});