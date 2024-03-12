const express= require('express');
const authorize = require('../middleware/authorizeMiddleware');
const {createChat, allChat, createGroupChat, renameGroup, addToGroup, removeFromGroup} = require('../controllers/chatControllers');

const router= express.Router();

// Create One to One Chat //
router.route('/').post(authorize, createChat);

// Find all Chat //
router.route('/').get(authorize, allChat);

// Create Group //
router.route('/group').post(authorize, createGroupChat);

// Rename Group //
router.route('/renameGroup').put(authorize, renameGroup);

// Add User to Group //
router.route('/addGroup').put(authorize, addToGroup);

// Remove User from Group //
router.route('/groupRemove').put(authorize, removeFromGroup);


module.exports= router;