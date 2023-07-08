const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const userModel = require('../models/user');
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

// Rate limiting middleware
const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 5, // Max number of requests allowed in the window
  message: 'Too many login attempts. Please try again later.',
});


/* 
Adds a new User to the database
*/
router.post('/signup/user', async (req, res) => {
  try {

    const newUser = new userModel({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    const saveUser = await newUser.save();
    const token = createSecretToken(saveUser._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    if (saveUser) {
      res.status(200).json({ message: `Created user ${saveUser['username']}` });
    } else {
      res.status(500).json({ message: 'We cannot create your account at this time' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Username or Email already exists.' });
  }
});


/* 
Login uses a post to not put sensitive credentials in URI
Rate limited to prevent brute force attacks
*/
router.post('/login/user', loginLimiter, async (req, res) => {
  try {
    const loginUser = await userModel.findOne({
      username: req.body.username,
    });

    const auth = await bcrypt.compare(req.body.password, loginUser.password)
    if (!auth) {
      return res.json({message:'Incorrect password or username' }) 
    }

    if (loginUser) {
      const token = createSecretToken(loginUser._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });

      res.status(200).json({ token, userId: loginUser._id});
    } else {
      res.status(500).json({ message: 'Username or Password does not exist.' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Username or Password does not exist.' });
  }
});


/* 
GET request to retrieve username by ID using an aggregate function
*/
router.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findOne({_id: userId})
    if(user) {
      res.status(200).json({ username: user.username });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving username', error: err });
  }
});


/* 
Updates a User with a Manager when one makes a rating
*/
router.put('/update/user/manager/:uid', async (req, res) => {
  try {
    const uid = req.params.uid;
    const { managers } = req.body;
    const updateUser = await userModel.findByIdAndUpdate(
      uid,
      { $set: { managers: managers.map((managerId) => ({ _id: managerId })) } },
      { new: true } // Returns the updated user document
    );
    res.status(200).json('Item Updated');
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
