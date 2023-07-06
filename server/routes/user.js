const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user');

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
      password: req.body.password,
    });
    if (loginUser) {
      // Create a JWT token
      const token = jwt.sign({ userId: loginUser._id  }, 'your-secret-key', {
        expiresIn: '1h', // Token expiration time
      });
      res.status(200).json({ token });
    } else {
      res.status(500).json({ message: 'We cannot retrieve your account at this time.' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Username or Password does not exist.' });
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
