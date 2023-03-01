const mongoose = require('mongoose');

// ========================================
// SCHEMAS
// ========================================

// user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    userId: String, 
    dailyLogs: [{
        totalCals: Number,
        totalProtein: Number, 
        totalFat: Number,
        foodEntries: [{
            name: String,
            calories: Number, 
            protein: Number,
            fat: Number,
            quantity: Number,
        }]
    }],
});

module.exports = mongoose.model("User", userSchema, "users");
