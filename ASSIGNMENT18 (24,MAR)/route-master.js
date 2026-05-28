// Assignment 26/03/2026 - Route Master
// Express routes for a bookstore (books, authors)
// Run: npm install express && node server.js

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// ── In-memory data ──────────────────────────────────────────
let books = [
  { id: 1, title: "The Alchemist", authorId: 1, genre: "Fiction", price: 299 },
  { id: 2, title: "Atomic Habits", authorId: 2, genre: "Self-Help", price: 399 },
  { id: 3, title: "Clean Code",    authorId: 3, genre: "Technology", price: 599 },
];

let authors = [
  { id: 1, name: "Paulo Coelho",  country: "Brazil" },
  { id: 2, name: "James Clear",   country: "USA" },
  { id: 3, name: "Robert Martin", country: "USA" },
];

let nextBookId   = 4;
let nextAuthorId = 4;

// ── BOOK ROUTES ─────────────────────────────────────────────

// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// GET single book
app.get("/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// POST create book
app.post("/books", (req, res) => {
  const { title, authorId, genre, price } = req.body;
  if (!title || !authorId) {
    return res.status(400).json({ message: "title and authorId are required" });
  }
  const book = { id: nextBookId++, title, authorId, genre, price };
  books.push(book);
  res.status(201).json(book);
});

// PUT update book
app.put("/books/:id", (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Book not found" });
  books[index] = { ...books[index], ...req.body, id: books[index].id };
  res.json(books[index]);
});

// DELETE book
app.delete("/books/:id", (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Book not found" });
  books.splice(index, 1);
  res.json({ message: "Book deleted" });
});

// ── AUTHOR ROUTES ────────────────────────────────────────────

// GET all authors
app.get("/authors", (req, res) => {
  res.json(authors);
});

// GET single author
app.get("/authors/:id", (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id));
  if (!author) return res.status(404).json({ message: "Author not found" });
  res.json(author);
});

// GET all books by an author
app.get("/authors/:id/books", (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id));
  if (!author) return res.status(404).json({ message: "Author not found" });
  const authorBooks = books.filter(b => b.authorId === parseInt(req.params.id));
  res.json({ author, books: authorBooks });
});

// POST create author
app.post("/authors", (req, res) => {
  const { name, country } = req.body;
  if (!name) return res.status(400).json({ message: "name is required" });
  const author = { id: nextAuthorId++, name, country };
  authors.push(author);
  res.status(201).json(author);
});

// PUT update author
app.put("/authors/:id", (req, res) => {
  const index = authors.findIndex(a => a.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Author not found" });
  authors[index] = { ...authors[index], ...req.body, id: authors[index].id };
  res.json(authors[index]);
});

// DELETE author
app.delete("/authors/:id", (req, res) => {
  const index = authors.findIndex(a => a.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Author not found" });
  authors.splice(index, 1);
  res.json({ message: "Author deleted" });
});

// ── START ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Bookstore server running at http://localhost:${PORT}`);
  console.log("\nBook Routes:");
  console.log("  GET    /books");
  console.log("  GET    /books/:id");
  console.log("  POST   /books");
  console.log("  PUT    /books/:id");
  console.log("  DELETE /books/:id");
  console.log("\nAuthor Routes:");
  console.log("  GET    /authors");
  console.log("  GET    /authors/:id");
  console.log("  GET    /authors/:id/books");
  console.log("  POST   /authors");
  console.log("  PUT    /authors/:id");
  console.log("  DELETE /authors/:id");
});