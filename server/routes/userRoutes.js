const express= require('express');
const {registerUser, loginUser, allUser} = require('../controllers/userControllers');
const authorize = require('../middleware/authorizeMiddleware');
const router= express.Router();

// Find all User //
router.route('/').get(authorize, allUser);

// Registration User //
router.route('/register').post(registerUser);

// Login User //
router.route('/login').post(loginUser);


module.exports= router;