const router = require('express').Router()
const {editCategoryAvailability, getCategories, addCategory, updateCategory, deleteCategory } = require('../controllers/categories_controllers')

router.route('/')
    .get(getCategories)
    .post(addCategory)

router.route('/:id')
    .put(updateCategory)
    .delete(deleteCategory)

router.route('/availablity/:id')
    .put(editCategoryAvailability)

module.exports = router;