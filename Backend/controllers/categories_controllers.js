const { editCategoryAvailability, getAllCategories, addCategory, updateCategory, deleteOneCategory } = require('../services/category_service');
const { ObjectId } = require('mongodb');

// GET METHOD FETCH ALL CATEGORIES
const getCategories_controller = async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.json({
            results: categories.length,
            success: true,
            message: "Categories fetched successfully",
            data: categories
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching categories",
            error: err.message
        });
        console.log(err);
    }
}

// ADD A NEW CATEGORY
const addCategory_controller = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCategory = {
            name,
            description,
            isAvailable: true
        }
        const result = await addCategory(newCategory);
        res.status(201).json({
            success: true,
            message: "Category added successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding category",
            error: error.message
        });
    }
}

// UPDATE A CATEGORY
const updateCategory_controller = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const result = await updateCategory(id, updateData);
        res.json({
            success: true,
            message: "Category updated successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating category",
            error: error.message
        });
    }
}

const editCategoryAvailablity_controller = async (req, res) => {
    try {
        const { id } = req.params;
        const { isAvailable } = req.body;
        const result = await editCategoryAvailability(id, isAvailable);        res.json({
            success: true,
            message: "Category availability updated successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating category availability",
            error: error.message
        });
    }
}
// DELETE A CATEGORY
const deleteCategory_controller = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteOneCategory(id);
        res.json({
            success: true,
            message: "Category deleted successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting category",
            error: error.message
        });
    }
}

module.exports = {
    getCategories: getCategories_controller,
    addCategory: addCategory_controller,
    updateCategory: updateCategory_controller,
    deleteCategory: deleteCategory_controller,
    editCategoryAvailability:editCategoryAvailablity_controller
}