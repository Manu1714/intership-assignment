// Assignment 30/03/2026 - Data Modeler
// MongoDB schema for a blogging platform using Mongoose
// Run: npm install mongoose && node data-modeler.js

const mongoose = require("mongoose");

// ── USER SCHEMA ──────────────────────────────────────────────
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    bio: {
      type: String,
      maxlength: 300,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// ── CATEGORY SCHEMA ──────────────────────────────────────────
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

// ── COMMENT SCHEMA (embedded in Post) ───────────────────────
const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

// ── POST SCHEMA ──────────────────────────────────────────────
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      maxlength: 300,
    },
    coverImage: {
      type: String,
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    comments: [commentSchema],
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// ── MODELS ───────────────────────────────────────────────────
const User     = mongoose.model("User",     userSchema);
const Category = mongoose.model("Category", categorySchema);
const Post     = mongoose.model("Post",     postSchema);

// ── CONNECT & DEMO ───────────────────────────────────────────
async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/blogDB");
    console.log("Connected to MongoDB");

    // Create a sample user
    const user = await User.create({
      username: "anusha",
      email: "anusha@example.com",
      password: "hashed_password_here",
      bio: "Full-stack developer and blogger.",
    });
    console.log("User created:", user.username);

    // Create a category
    const category = await Category.create({
      name: "Technology",
      slug: "technology",
    });
    console.log("Category created:", category.name);

    // Create a post
    const post = await Post.create({
      title: "Getting Started with Node.js",
      slug: "getting-started-with-nodejs",
      content: "Node.js is a JavaScript runtime built on Chrome's V8 engine...",
      excerpt: "A beginner's guide to Node.js.",
      author: user._id,
      category: category._id,
      tags: ["nodejs", "javascript", "backend"],
      status: "published",
    });
    console.log("Post created:", post.title);

    // Add a comment
    post.comments.push({ author: user._id, content: "Great post!" });
    await post.save();
    console.log("Comment added to post");

    // Fetch post with populated fields
    const fullPost = await Post.findById(post._id)
      .populate("author", "username email")
      .populate("category", "name slug");
    console.log("\nFull Post:");
    console.log("  Title   :", fullPost.title);
    console.log("  Author  :", fullPost.author.username);
    console.log("  Category:", fullPost.category.name);
    console.log("  Tags    :", fullPost.tags.join(", "));
    console.log("  Status  :", fullPost.status);
    console.log("  Comments:", fullPost.comments.length);

  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("\nDisconnected from MongoDB");
  }
}

main();

module.exports = { User, Category, Post };