const Post = require("../models/post");

// The service layer handles all interaction with the database.
// Each function receives the data it needs and returns a result.
// Controllers call these functions and decide what HTTP response to send.

// ----------------------------------------------------------
// Return all posts as an array.
// ----------------------------------------------------------
async function findAll() {
  return Post.find().populate("author", "name email avatar");
}

// ----------------------------------------------------------
// Return a single post by its id.
// Returns null if no post is found.
// ----------------------------------------------------------
async function findById(id) {
  return Post.findById(id).populate("author", "name email avatar");
}

// ----------------------------------------------------------
// Insert a new post from body.
// Returns the created document.
// ----------------------------------------------------------
async function create(body) {
  const post = await Post.create(body);
  return post.populate("author", "name email avatar");
}

// ----------------------------------------------------------
// Update a post by id with the fields in body.
// Returns the updated document, or null if not found.
// ----------------------------------------------------------
async function update(id, body) {
  return Post.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  }).populate("author", "name email avatar");
}

// ----------------------------------------------------------
// Delete a post by id.
// Returns the deleted document, or null if not found.
// ----------------------------------------------------------
async function remove(id) {
  return Post.findByIdAndDelete(id);
}

module.exports = { findAll, findById, create, update, remove };
