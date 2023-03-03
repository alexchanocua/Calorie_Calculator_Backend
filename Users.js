const mongoose = require('mongoose');

// ========================================
// SCHEMAS
// ========================================

// dailyLogs schema
const dailyLogs = new mongoose.Schema({
    totalCals: {type: Number, default: 0},
    totalProtein: {type: Number, default: 0},
    totalFat: {type: Number, default: 0},
    foodEntries: [{
        type: {type: String, required: true },
        name: {type: String, required: true},
        calories: {type: Number, required: true},
        protein: {type: Number, required: true},
        fat: {type: Number, required: true},
        quantity: {type: Number, required: true},
    }]
});

// user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    userId: String, 
    dailyLogs: [dailyLogs]
});

module.exports = mongoose.model("User", userSchema, "users");
