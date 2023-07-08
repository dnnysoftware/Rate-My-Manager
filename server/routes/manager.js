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
            birthDate: req.body.birthDate,
            companies: req.body.companies
        })
        const saveManager = await newManager.save();
        if (saveManager) {
            res.status(200).json({ message: `Created manager ${saveManager['firstName']} ${saveManager['lastName']}` });
          } else {
            res.status(500).json({ message: 'We cannot create a manager at this time' });
          }
    } catch (err) {
        res.status(400).json({ message: 'First name, Last name and Birthday already exists.' });
    }
});


/* 
Recieves all users that made posts on a specific manager by a manager id
*/
router.get('/receive/managers/:name', async (req, res) => {
    try {
        let foundManagers = [];
        const searchName = req.params.name.trim(); // Trim any leading or trailing spaces

        if (searchName.indexOf(' ') === -1) {
            foundManagers = await managerModel.aggregate([
                {
                    $match: {
                        $or: [
                            { "firstName": { $regex: new RegExp(searchName, 'i') } },
                            { "lastName": { $regex: new RegExp(searchName, 'i') } }
                        ]
                    }
                },
                {
                    $project: {
                        firstName: 1,
                        lastName: 1,
                        birthDate: 1,
                        companies: 1,
                        ratings: 1,
                        age: {
                            $trunc: {
                                $divide: [
                                    { $subtract: [new Date(), "$birthDate"] },
                                    365 * 24 * 60 * 60 * 1000
                                ]
                            }
                        }
                    }
                }, 
                {
                    $limit: 10
                }
            ]);
        } else {
            const names = searchName.split(' ');
            const firstName = names[0];
            const lastName = names.slice(1).join(' '); // Combine remaining names as the last name

            foundManagers = await managerModel.aggregate([
                {
                    $match: {
                        $or: [
                            {
                                "firstName": { $regex: new RegExp(firstName, 'i') },
                                "lastName": { $regex: new RegExp(lastName, 'i') }
                            },
                            {
                                "firstName": { $regex: new RegExp(lastName, 'i') },
                                "lastName": { $regex: new RegExp(firstName, 'i') }
                            }
                        ]
                    }
                },
                {
                    $project: {
                        firstName: 1,
                        lastName: 1,
                        birthDate: 1,
                        companies: 1,
                        ratings: 1,
                        age: {
                            $trunc: {
                                $divide: [
                                    { $subtract: [new Date(), "$birthDate"] },
                                    365 * 24 * 60 * 60 * 1000
                                ]
                            }
                        }
                    }
                }, 
                {
                    $limit: 10
                }
            ]);
        }
        res.status(200).json(foundManagers);
    } catch (err) {
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
Recieves all ratings for a specific manager id
*/
router.get('/receive/ratings/:mid', async (req, res) => {
    try{
        const mid = req.params.mid;
        const foundRatings = await managerModel.find({"manager": mid});
        res.status(200).json(foundRatings);
    }catch(err) {
        res.json(err);
    }
});


/* 
Adds a new Rating for a manager to the database
*/
router.put('/add/rating/:mid', async (req, res) => {
    try {
        const managerId = req.params.mid;
        const manager = await managerModel.findById(managerId);

        if (!manager) {
            return res.status(404).json({ message: 'Manager not found' });
        }

        const userId = req.body.user;
        const existingRatingIndex = manager.ratings.findIndex(rating => rating.user.toString() === userId);

        if (existingRatingIndex !== -1) {
            // Update the existing rating
            const existingRating = manager.ratings[existingRatingIndex];
            existingRating.rating = req.body.rating;
            existingRating.description = req.body.description;

            await manager.save();

            return res.status(200).json(manager);
        }

        // Add a new rating
        const newRating = {
            user: req.body.user,
            username: req.body.username,
            company: req.body.company,
            rating: req.body.rating,
            description: req.body.description
        };

        manager.ratings.push(newRating);

        const companiesArr = manager.companies;
        companiesArr.push(req.body.company);

        manager.companies = [...new Set(companiesArr)];

        const updatedManager = await manager.save();

        res.status(200).json(updatedManager);
    } catch (err) {
        res.status(500).json({ message: 'Error adding/updating rating', error: err });
    }
});




module.exports = router;