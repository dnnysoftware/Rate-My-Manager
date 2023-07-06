const router = require('express').Router();

const managerModel = require('../models/manager');

/* 
Adds a new Manager to the database
*/
router.post('/add/manager', async (req, res) => {
    try{
        const newManager= new managerModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate
        })
        const saveManager = await newManager.save();
        res.status(200).json(saveManager);
    }catch(err) {
        res.json(err);
    }
});


/* 
Recieves all users that made posts on a specific manager by a manager id
*/
router.get('/receive/managers/:name', async (req, res) => {
    try{
        const firstName = req.params.name.substring(0, req.params.name.indexOf(' ')); 
        const lastName = req.params.name.substring(req.params.name.indexOf(' ') + 1);
        const foundManagers = await managerModel.find({"firstName": firstName, "lastName": lastName});
        res.status(200).json(foundManagers);
    }catch(err) {
        res.json(err);
    }
});


/* 
Updates a Manager with a User when one makes a rating
*/
router.put('/update/manager/user/:mid', async (req, res) => {
    try{
        const mid = req.params.mid;
        const { users } = req.body;
        const updateManager = await managerModel.findByIdAndUpdate(
            mid,
            { $set: { users: users.map(userId => ({ _id: userId })) } },
            { new: true } // Returns the updated user document
        );
        res.status(200).json("User Added To Manager's Rated");
    }catch(err) {
        res.json(err);
    }
});


/* 
Updates a Manager with a company they may work for
*/
router.put('/update/manager/company/:mid', async (req, res) => {
    try{
        const mid = req.params.mid;
        const { companies } = req.body;
        const updateManager = await managerModel.findByIdAndUpdate(
            mid,
            { $set: { companies: companies.map(managerId => ({ _id: managerId })) } },
            { new: true } // Returns the updated user document
        );
        res.status(200).json("New Company Added To Manager's Work Experience");
    }catch(err) {
        res.json(err);
    }
});

module.exports = router;