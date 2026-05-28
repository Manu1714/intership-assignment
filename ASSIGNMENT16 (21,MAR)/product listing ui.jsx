// Assignment 21/03/2026 - Product Listing UI
// Mini e-commerce frontend with product cards and filters

import { useState } from "react";

const PRODUCTS = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 1299, rating: 4.5, image: "🎧" },
  { id: 2, name: "Running Shoes", category: "Sports", price: 899, rating: 4.2, image: "👟" },
  { id: 3, name: "Coffee Maker", category: "Kitchen", price: 649, rating: 4.7, image: "☕" },
  { id: 4, name: "Bluetooth Speaker", category: "Electronics", price: 499, rating: 4.1, image: "🔊" },
  { id: 5, name: "Yoga Mat", category: "Sports", price: 299, rating: 4.4, image: "🧘" },
  { id: 6, name: "Air Fryer", category: "Kitchen", price: 849, rating: 4.6, image: "🍳" },
  { id: 7, name: "Smartwatch", category: "Electronics", price: 1999, rating: 4.3, image: "⌚" },
  { id: 8, name: "Water Bottle", category: "Sports", price: 149, rating: 4.0, image: "🍶" },
];

const CATEGORIES = ["All", "Electronics", "Sports", "Kitchen"];

export default function ProductListingUI() {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");

  let filtered = PRODUCTS.filter(p => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sort === "price-low") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "1rem 2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <h1 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 700, color: "#1e293b" }}>🛍️ Shop</h1>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products…"
          style={{ marginLeft: "auto", padding: "0.5rem 0.85rem", border: "1px solid #e2e8f0", borderRadius: "0.5rem", fontSize: "0.9rem", width: "200px", outline: "none" }}
        />
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "1.5rem" }}>

        {/* Filters row */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center", marginBottom: "1.5rem" }}>
          {/* Category filter */}
          <div style={{ display: "flex", gap: "0.4rem" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: "0.35rem 0.9rem", borderRadius: "2rem", fontSize: "0.82rem",
                  background: category === cat ? "#1e293b" : "#fff",
                  color: category === cat ? "#fff" : "#64748b",
                  border: `1px solid ${category === cat ? "#1e293b" : "#e2e8f0"}`,
                  cursor: "pointer", fontWeight: category === cat ? 600 : 400,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{ marginLeft: "auto", padding: "0.35rem 0.75rem", border: "1px solid #e2e8f0", borderRadius: "0.5rem", fontSize: "0.82rem", color: "#374151", outline: "none", background: "#fff" }}
          >
            <option value="default">Sort: Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Results count */}
        <p style={{ fontSize: "0.82rem", color: "#94a3b8", margin: "0 0 1rem" }}>{filtered.length} products</p>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "#94a3b8" }}>
            <p style={{ fontSize: "2rem" }}>🔍</p>
            <p>No products found.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
            {filtered.map(product => (
              <div
                key={product.id}
                style={{
                  background: "#fff", borderRadius: "0.75rem", border: "1px solid #e2e8f0",
                  padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem",
                  transition: "box-shadow 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <div style={{ fontSize: "2.5rem", textAlign: "center", padding: "0.75rem 0" }}>{product.image}</div>
                <span style={{ fontSize: "0.7rem", color: "#0284c7", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{product.category}</span>
                <p style={{ margin: 0, fontWeight: 600, color: "#1e293b", fontSize: "0.95rem" }}>{product.name}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                  <span style={{ fontWeight: 700, color: "#1e293b", fontSize: "1rem" }}>₹{product.price}</span>
                  <span style={{ fontSize: "0.78rem", color: "#f59e0b", fontWeight: 600 }}>★ {product.rating}</span>
                </div>
                <button style={{
                  marginTop: "0.5rem", padding: "0.5rem", width: "100%",
                  background: "#1e293b", color: "#fff", border: "none",
                  borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600,
                }}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}