const router = require('express').Router();
const {
    updateUserPassword,
    getUsers,
    addUser,
    updateUser,
    deleteUser
} = require('../controllers/users_controllers');

router.route('/')
    .get(getUsers)
    .post(addUser);

router.route('/:id')
    .put(updateUser)
    .delete(deleteUser);

router.route('/password/:id')
    .put(updateUserPassword);

module.exports = router;