// const router = require('express').Router();

// const ratingModel = require('../models/rating');


// /* 
// Recieves all ratings for a specific manager id
// */
// router.get('/receive/ratings/:mid', async (req, res) => {
//     try{
//         const mid = req.params.mid;
//         const foundRatings = await ratingModel.find({"manager": mid});
//         res.status(200).json(foundRatings);
//     }catch(err) {
//         res.json(err);
//     }
// });


// /* 
// Adds a new Rating to the database
// */
// router.post('/add/rating', async (req, res) => {
//     try{
//         const newRating= new ratingModel({
//             user: req.body.user,
//             manager: req.body.manager,
//             company: req.body.company,
//             rating: req.body.rating,
//             description: req.body.description
//         })
//         const saveRating = await newRating.save();
//         res.status(200).json(saveRating);
//     }catch(err) {
//         res.json(err);
//     }
// });


// module.exports = router;