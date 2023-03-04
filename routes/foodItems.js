const express = require('express');
const { findOne } = require('../Users');
const router = express.Router();
// importing Schema
const User = require('../Users');

router
    .route('/:id')
    .get( async (req, res) => {
        // get the user items by date
        // get the date from the body
        const { id } = req.params;
        const { date } = req.body;
        try{
            const log = await User.findOne({
                userId: id,
                'dailyLogs.dateWithoutTime': date,
                
            });
            res.json(...log.dailyLogs);
        }catch(error) {
            res.status(500).json({error});
        }
        
    })
    .post( async (req, res) => {
        // post new user items
    })
    .put( async (req, res) => {
        // update the users item list
        const { id } = req.params;
        const { type, name, calories, protein, carbs, fat, quantity, date} = req.body;
        const newItem = {
            type: type,
            name: name,
            calories: calories,
            protein: protein,
            carbs: carbs,
            fat: fat,
            quantity: quantity,
        }
        try {
            const result = await User.findOneAndUpdate(
                { 
                  userId: id,
                  'dailyLogs': { 
                    $elemMatch: { 
                      'dateWithoutTime': date, 
                    } 
                  } 
                },
                { 
                  $push: { 'dailyLogs.$.foodEntries': newItem },
                  $inc: {
                    'dailyLogs.$.totalCals': calories * quantity,
                    'dailyLogs.$.totalProtein': protein * quantity,
                    'dailyLogs.$.totalFat': fat * quantity,
                  },
                },
                { new: true }
              );
            res.json(result);
        } catch (error) {
            res.status(500).json({error});
        }
    })
    .delete( async (req, res) => {
        // remove an item from the list
    })

module.exports = router;