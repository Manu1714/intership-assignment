# 📁 Internship Assignments — Manoj kumar B

A complete collection of all frontend and JavaScript assignments submitted during the internship program. Each folder is named and dated for easy navigation.

---

## 👤 Student Details

| Field       | Info                      |
|-------------|---------------------------|
| Name        | Manoj Kumar B                 |
| Program     | B.Tech CSE                |
| Company     | Supermentr Full Stack     |
| Type        | Internship Assignments    |

---

## 📂 Folder Structure

```
INTERSHIP-ASSINGMENT--main/
│
├── 01 ASSIGNMENT 1/
│   └── RESUME.HTML
│
├── 02 ASSIGNMENT 2(09.FEB)/
│   └── client server architecture.jpg
│
├── 03 ASSIGNMENT 3(12.FEB)/
│   └── my first web.html
│
├── 04 ASSIGNMENT 4(17.FEB)/
│   ├── index.html
│   └── style.css
│
├── 05 ASSIGNMENT 5(21.FEB)/
│   ├── hero.html
│   └── hero.css
│
├── 06 ASSIGNMENT 6(24.FEB)/
│   └── console challenge.jsx
│
├── 07 ASSIGNMENT 7(28.FEB)/
│   └── student manager.js
│
├── 08 ASSIGNMENT 8(02.MAR)/
│   └── interactive form.html
│
├── 09 ASSIGNMENT 9(05.MAR)/
│   └── component hunt.html
│
├── 10 ASSIGNMENT 10(07.MAR)/
│   └── weather dashboard.jsx
│
├── 11 ASSIGNMENT 11(09.MAR)/
│   ├── app.jsx
│   └── mood tracker.jsx
│
├── 12 ASSIGNMENT 12(10.MAR)/
│   └── dynamic list.jsx
│
├── 13 ASSIGNMENT 13(11.MAR)/
│   └── multi page app.jsx
│
├── 14 ASSIGNMENT 14(12.MAR)/
│   └── smart signup form.jsx
│
├── 16 ASSIGNMENT 16(21.MAR)/
│   └── product listing ui.jsx
│
├── 17 ASSIGNMENT 17(23.MAR)/
│   └── hello server .js
│
└── README.md
```

---

## 📋 Assignment Details

---

### 01 — Resume (HTML)
**File:** `RESUME.HTML`  
**Tech:** HTML, CSS (Google Fonts — DM Serif, DM Mono, DM Sans)  
**Description:** A personal resume/CV page built entirely with HTML and inline CSS. Includes professional styling using DM font family loaded via Google Fonts.

---

### 02 — Client Server Architecture (09 Feb)
**File:** `client server architecture.jpg`  
**Tech:** Visual / Diagram  
**Description:** A diagram illustrating the Client-Server Architecture concept — showing how clients send requests and servers send back responses over a network.

---

### 03 — My First Web Page (12 Feb)
**File:** `my first web.html`  
**Tech:** HTML, CSS  
**Description:** A personal profile webpage — the first full HTML page built from scratch. Contains basic profile information about Amith K G using standard HTML tags and inline CSS for styling.

---

### 04 — Make It Beautiful — Personal Profile (17 Feb)
**Files:** `index.html`, `style.css`  
**Tech:** HTML, External CSS (Google Fonts — Poppins, Playfair Display, Fira Code)  
**Description:** An upgraded personal profile page with a separate external stylesheet. Uses CSS variables for theming (primary color `#0f2d5e`), clean typography, and a polished layout. Demonstrates separation of structure (HTML) and styling (CSS).

---

### 05 — Responsive Hero Page (21 Feb)
**Files:** `hero.html`, `hero.css`  
**Tech:** HTML, CSS (Google Fonts — Syne, DM Sans), Responsive Design  
**Description:** A fully responsive hero/landing section for a portfolio. Built with CSS variables for theming, responsive breakpoints, and modern font pairings. Demonstrates mobile-first design principles.

---

### 06 — Console Challenge (24 Feb)
**File:** `console challenge.jsx`  
**Tech:** JavaScript  
**Description:** A set of calculator operations (addition, subtraction, multiplication, division, etc.) implemented as JavaScript functions and logged to the browser/Node console. Covers basic arithmetic logic and function declarations.

---

### 07 — Student Manager (28 Feb)
**File:** `student manager.js`  
**Tech:** JavaScript (Arrays, Objects)  
**Description:** A JavaScript program that manages an array of student objects, each containing a name and an array of marks. Calculates totals, averages, and ranks students. Demonstrates working with arrays of objects, loops, and basic data processing.

**Sample Data:**
```js
{ name: "Manoj Kumar B",    marks: [85, 90, 78, 92, 88] }
{ name: "Rahul Kumar",  marks: [70, 65, 80, 75, 72] }
{ name: "Priya Sharma", marks: [95, 98, 92, 97, 99] }
```

---

### 08 — Interactive Form (02 Mar)
**File:** `interactive form.html`  
**Tech:** HTML, CSS, JavaScript (DOM)  
**Description:** A dynamic HTML form with real-time JavaScript validation and interaction. Background color `#f2f2f2` with `Arial` font. Demonstrates DOM manipulation, event listeners, and client-side form handling.

---

### 09 — Component Hunt (05 Mar)
**File:** `component hunt.html`  
**Tech:** HTML, CSS, JavaScript  
**Description:** An assignment focused on identifying and building UI components. Background styled with `#f2f2f2`. Demonstrates understanding of reusable UI elements and component-based thinking in plain HTML/CSS/JS.

---

### 10 — Weather Dashboard (07 Mar)
**File:** `weather dashboard.jsx`  
**Tech:** React, Open-Meteo API, Open-Meteo Geocoding API  
**Description:** A React-based weather dashboard that fetches real-time weather data. Uses two APIs:
- `https://geocoding-api.open-meteo.com/v1/search` — for city search
- `https://api.open-meteo.com/v1/forecast` — for weather data

Features WMO weather code mapping with icons and gradient backgrounds:
- Clear Sky → orange/amber gradient 🌤
- Partly Cloudy → slate gradient ☁

Uses `useState`, `useEffect`, and `useCallback` hooks.

---

### 11 — Mood Tracker (09 Mar)
**Files:** `app.jsx`, `mood tracker.jsx`  
**Tech:** React, useState  
**Description:** A React mood tracking app with multiple mood states. Each mood has an id, label, emoji, color, background, accent, text color, and description. Example moods include "Radiant" (gold tones, `#f59e0b`).  
`app.jsx` is the entry point that renders `<MoodTracker />`. Includes a commented-out option to switch to the Dynamic List app instead.

---

### 12 — Dynamic List (10 Mar)
**File:** `dynamic list.jsx`  
**Tech:** React, useState, useRef, useEffect  
**Description:** A feature-rich task/to-do list app in React. Features include:
- Filter tabs: All / Active / Done
- Color-coded tasks with 7 color options
- Pin tasks to top
- Pre-loaded sample tasks (Read 20 pages, Morning run, Write lecture notes)
- Local state management using a custom `useLocalTasks` hook

---

### 13 — Multi Page App (11 Mar)
**File:** `multi page app.jsx`  
**Tech:** React, React Router DOM  
**Description:** A multi-page React application using `react-router-dom`. Implements client-side routing with a `Navbar` component that highlights the active route using `useLocation`.

**Routes:**
| Path       | Page     |
|------------|----------|
| `/`        | Home     |
| `/about`   | About    |
| `/contact` | Contact  |

**To run:**
```bash
npm install react-router-dom
```

---

### 14 — Smart Signup Form (12 Mar)
**File:** `smart signup form.jsx`  
**Tech:** React, useState  
**Description:** A React signup form with real-time password strength validation. The `getPasswordStrength()` function scores passwords based on:
- Length ≥ 8 characters
- Uppercase letters
- Numbers
- Special characters

Displays strength label and color indicator dynamically. Also includes email format validation.

---

### 16 — Product Listing UI (21 Mar)
**File:** `product listing ui.jsx`  
**Tech:** React, useState  
**Description:** A mini e-commerce frontend with product cards and category filters. Products include:

| Product              | Category    | Price  | Rating |
|----------------------|-------------|--------|--------|
| Wireless Headphones  | Electronics | ₹1,299 | 4.5 ⭐ |
| Running Shoes        | Sports      | ₹899   | 4.2 ⭐ |
| Coffee Maker         | Kitchen     | ₹649   | 4.7 ⭐ |

Features category-based filtering using `useState`.

---

### 17 — Hello Server (23 Mar)
**File:** `hello server .js`  
**Tech:** Node.js, `http` module  
**Description:** A basic Node.js HTTP server running on port 3000. Returns different text responses based on the route accessed.

**Routes:**
| Route      | Response                                      |
|------------|-----------------------------------------------|
| `/`        | Hello! Welcome to the Home page.              |
| `/about`   | This is the About page. We build cool things. |
| `/contact` | Reach us at contact@example.com               |
| `/hello`   | Hello, World!                                 |

**To run:**
```bash
node "hello server .js"
```
Then open: `http://localhost:3000`

---

## 🛠 Technologies Used

| Technology       | Used In                          |
|------------------|----------------------------------|
| HTML & CSS       | Assignments 1, 3, 4, 5, 8, 9    |
| JavaScript (Vanilla) | Assignments 6, 7             |
| React (JSX)      | Assignments 10–14, 16           |
| React Router DOM | Assignment 13                   |
| Node.js (http)   | Assignment 17                   |
| Open-Meteo API   | Assignment 10                   |
| Google Fonts     | Assignments 1, 4, 5             |

---

## 🚀 How to Run

### HTML Files
Simply open any `.html` file directly in a browser — no setup needed.

### React (JSX) Files
```bash
npx create-react-app my-app
# Replace src/App.js content with the .jsx file
npm start
```

### Node.js Server (Assignment 17)
```bash
node "hello server .js"
# Visit http://localhost:3000
```

---

## 📌 Notes

- Assignment 15 folder is not present in this submission.
- Assignment 2 is a diagram image (JPG), not a code file.
- All React assignments use functional components with hooks.
- No assignment uses class-based React components.

---

*README generated for INTERSHIP-ASSINGMENT--main repository — Manoj Kumar B*
