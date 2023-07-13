const express = require('express');
const router = express.Router();
const { getHomePage, createUser, deleteUserById, deleteAllUsers, getUserInfor, changeUser, updateUser } = require('../controller/homeController')


router.get('/', getHomePage);

router.get('/:id', getUserInfor);

router.post('/', createUser);

router.delete('/:id', deleteUserById);

router.delete('/', deleteAllUsers);

router.put('/:id', changeUser);

router.patch('/:id', updateUser);


module.exports = router;