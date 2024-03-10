const express= require('express');
const {registerUser, loginUser, allUser} = require('../controllers/userControllers');
const authorize = require('../middleware/authorizeMiddleware');
const router= express.Router();

router.route('/').get(authorize, allUser);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

module.exports= router;