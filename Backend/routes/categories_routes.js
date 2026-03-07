const router = require('express').Router()
const { getCategories, addCategory, updateCategory, deleteCategory } = require('../controllers/categories_controllers')

router.route('/')
    .get(getCategories)
    .post(addCategory)

router.route('/:id')
    .put(updateCategory)
    .delete(deleteCategory)

module.exports = router;