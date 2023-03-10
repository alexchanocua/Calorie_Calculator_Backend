const express = require('express');
const { findOne } = require('../Users');
const router = express.Router();
// importing Schema
const DailyLogs = require('../DailyLogs');

router
    .route('/:id')
    .get( async (req, res) => {
        // get the user items by date
        // get the date from the body
        const { id } = req.params;
        const { date } = req.body;
        try{
            const log = await DailyLogs.findOne({
                userId: id,
                date: date,
            });
            // if there is a log return the log else return empty array
            if(log){
                res.json(log);
            } else {
                res.status(404).json({error: "User not found."});
            }
            
        }catch(error) {
            res.status(500).json({error});
        }
        
    })
    .post( async (req, res) => {
        // post new user items
        const { id } = req.params;
        const { date } = req.body;
        const myDate = new Date(date);
        try {
            // check if we have a document already
            const existingLog = await DailyLogs.findOne(
                {userId: id, date: myDate}
            );
            // if it exists return the existingLog and error
            if(existingLog){
                res.status(409).json({existingLog, error: "Document already exists."})
            }
            // post a new dailyLog for the user
            const log = await DailyLogs.create({userId: id, date: myDate});
            res.status(201).json(log);
        } catch (error) {
            res.status(500).json({error: error.toString()});
        }
    })
    .put( async (req, res) => {
        // update the users item list
        const { id } = req.params;
        const { type, name, calories, protein, carbs, fat, quantity, date} = req.body;
        const myDate = new Date(date);
        try {
            const updatedLog = await DailyLogs.findOneAndUpdate(
                {userId: id, date: myDate},
                {$push : {foodEntries: {
                    type: type,
                    name: name,
                    calories: calories,
                    protein: protein,
                    carbs: carbs,
                    fat: fat,
                    quantity: quantity,
                }}},
                {new: true}
            )
            res.json(updatedLog);
        } catch (error) {
            res.status(500).json({error});
        }
    })
    .delete( async (req, res) => {
        // remove an item from the list
        const { id } = req.params;
        const { foodId, date } = req.body;
        const myDate = new Date(date);
        try {
            // find the correct log and remove the item
            const updatedLog = await DailyLogs.findOneAndUpdate(
                {userId: id, date: myDate},
                {$pull: { foodEntries: {_id: foodId} }},
                {new: true, multi: false}
            );
            res.json(updatedLog);
        } catch (error) {
            res.json({error: error.toString()});
        }
    })

module.exports = router;