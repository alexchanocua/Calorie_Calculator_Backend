const express = require('express');

const router = express.Router();
// Schema
const User = require('../Users');
const DailyLogs = require('../DailyLogs');

// might have to get rid of these
router.get('/', (req, res, next) => {
    res.json({message: "get/nouser"});
});

router.post('/', (req, res) => {
    res.send('Create user');
})

//  place this dynamic route last
router
    .route('/:id')
    .get( async (req, res) => {
        // getting the user id
        const { id } = req.params;
        try {
            const user = await User.findOne({userId: `${id}`});
            res.json(user);
        } catch (error) {
            res.status(400).json({error: error.toString()});
        }
    })
    .post( async (req,res) => {
        // get the userId from the params
        const { id } = req.params;
        const { name, email } = req.body;

        try {
            // check if a user already exists
            const existingUser = await User.findOne({userId: id});
            if(existingUser){
                return res.status(409).json({error: "User already exists."});
            } 
            // create the new user
            const user = await User.create({
                name: name,
                email: email,
                userId: id, 
            })
            const log = await DailyLogs.create({userId: id});
            // responding with the user object
            res.status(201).json({id: user.userId, log: log});
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    })
    .put((req, res) => {

        res.send(`Update User with Id ${req.params.id}`);
    })
    .delete( async (req, res) => {
        const { id } = req.params;
        // deleting user from DB
        try {
            const deletedUser = await User.deleteOne({userId: `${id}` });
            res.json(deletedUser);
        } catch (error) {
            res.status(400).json({error: 'user does not exist'});
        }
    });

router.param("id", (req, res, next, id) => {
    // TODO: implement logic to retrieve User info from MondoDB using Mongoose
    next();
})

module.exports = router;