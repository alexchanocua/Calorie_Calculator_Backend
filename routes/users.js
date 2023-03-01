const express = require('express');
const router = express.Router();
// Schema
const User = require('../Users');


router.get('/', (req, res, next) => {
    res.json({message: "hi"});
});

router.post('/', (req, res) => {
    res.send('Create user');
})

//  place this dynamic route last
router
    .route('/:id')
    .get((req, res) => {
        res.send(`Get User with Id ${req.params.id}`);
    })
    .post( async (req,res) => {
        // get the userId from the params
        const { id } = req.params;
        const { name, email } = req.body;
        try {
            const user = await User.create({
                name: name,
                email: email,
                userId: id, 
                dailyLogs: [{
                    totalCals: 0,
                    totalProtein: 0, 
                    totalFat: 0,
                    foodEntries: []
                }],
            })
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    })
    .put((req, res) => {
        res.send(`Update User with Id ${req.params.id}`);
    })
    .delete((req, res) => {
        res.send(`Delete User with Id ${req.params.id}`);
    });

router.param("id", (req, res, next, id) => {
    // TODO: implement logic to retrieve User info from MondoDB using Mongoose
    console.log(id);
    next();
})

module.exports = router;