const express = require('express');

const router = express.Router();
const userController = require('../Controller/userController');



router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;