const router = require('express').Router();

const userModel = require('../models/user');
const managerModel = require('../models/manager');

/* 
Adds a new User to the database
*/
router.post('/signup/user', async (req, res) => {
    try{
        const newUser= new userModel({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        })
        const saveUser = await newUser.save();
        res.status(200).json(saveUser);
    }catch(err) {
        res.json(err);
    }
});

/* 
Login uses a post to not put sensitive credentials in URI
*/
router.post('/login/user', async (req, res) => {
    try{
        const loginUser = await userModel.findOne({
            "username": req.body.username,
            "password": req.body.password
        });
        console.log(loginUser)
        res.status(200).json(loginUser);
    }catch(err) {
        res.json(err);
    }
});


/* 
Updates a User with a Manager when one makes a rating
*/
router.put('/update/user/manager/:uid', async (req, res) => {
    try{
        const uid = req.params.uid;
        const { managers } = req.body;
        const updateUser = await userModel.findByIdAndUpdate(
            uid,
            { $set: { managers: managers.map(managerId => ({ _id: managerId })) } },
            { new: true } // Returns the updated user document
        );
        res.status(200).json("Item Updated");
    }catch(err) {
        res.json(err);
    }
});



module.exports = router;