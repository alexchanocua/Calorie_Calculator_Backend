const mongoose = require('mongoose');

// dailyLogs schema
const dailyLogsSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    totalCals: {type: Number, default: 0},
    totalProtein: {type: Number, default: 0},
    totalFat: {type: Number, default: 0},
    foodEntries: [{
        type: {type: String, required: true },
        name: {type: String, required: true},
        calories: {type: Number, required: true},
        protein: {type: Number, required: true},
        carbs: {type: Number, required: true},
        fat: {type: Number, required: true},
        quantity: {type: Number, required: true},
    }],
    date: {
        type: Date, 
        required: true, 
        default: () => {
            const now = new Date();
            now.setUTCHours(0,0,0,0);
            return now;
          }},
});

// virtual property for date in dailyLogs
dailyLogsSchema.virtual('dateWithoutTime')
    .get(function (){
        const date = this.get('date');
        // returns date in this format YYYY-MM-DD
        console.log('Virtual:', Date(date.getFullYear(), date.getMonth(), date.getDate()));
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    });

module.exports = mongoose.model("DailyLogs", dailyLogsSchema, "dailyLogs");