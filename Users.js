const mongoose = require('mongoose');

// ========================================
// SCHEMAS
// ========================================

// user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    userId: String, 
});

module.exports = mongoose.model("User", userSchema, "users");
