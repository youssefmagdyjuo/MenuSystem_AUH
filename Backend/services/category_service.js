const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

// Fetch all categories from the database
const getAllCategories = async () => {
    const db = getDB();
    return await db.collection('categories').find().toArray();
};
// Get category name by ID
const getCategoryNameById = async (categoryId) => {
    const db = getDB();
    const category = await db.collection('categories').findOne({ _id: new ObjectId(categoryId) });
    return category ? category.name : null;
};
// Add a new category to the database
const addCategory = async (categoryData) => {
    const db = getDB();
    const result = await db.collection('categories').insertOne(categoryData);
    return result;
};

// Update a category in the database
const updateCategory = async (categoryId, updateData) => {
    const db = getDB();
    const result = await db.collection('categories').updateOne(
        { _id: new ObjectId(categoryId) },
        { $set: updateData }
    );
    const category = await db.collection('categories').findOne({ _id: new ObjectId(categoryId) });
    //update category name in products related
    await db.collection('products').updateMany(
        { categoryId: new ObjectId(categoryId) },
        { $set: { categoryName: category.name } }
    );
    return result;
};
//editCategoryAvailablity
const editCategoryAvailability = async (categoryId, isAvailable) => {
    const db = getDB();

    const result = await db.collection('categories').updateOne(
        { _id: new ObjectId(categoryId) },
        { $set: { isAvailable } }
    );

    await db.collection('products').updateMany(
        { categoryId: new ObjectId(categoryId) },
        { $set: { isAvailable } }
    );

    return result;
};


// Delete a category from the database
const deleteOneCategory = async (categoryId) => {
    const db = getDB();
    // Delete the category
    const result = await db.collection('categories').deleteOne({ _id: new ObjectId(categoryId) });
    // Also delete all products associated with this category
    await db.collection('products').deleteMany({
        categoryId: new ObjectId(categoryId)
    });
    return result;
};

module.exports = {
    getAllCategories,
    addCategory,
    updateCategory,
    deleteOneCategory,
    getCategoryNameById,
    editCategoryAvailability
};