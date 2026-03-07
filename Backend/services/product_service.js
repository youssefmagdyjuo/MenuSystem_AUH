const { getDB } = require('../db');
const { ObjectId } = require('mongodb');
// Fetch all products from the database
const getAllProducts = async () => {
    const db = getDB();
    return await db.collection('products').find().toArray();
};
// Add a new product to the database
const addProduct = async (productData) => {
    const db = getDB();
    const result = await db.collection('products').insertOne(productData);
    return result;
};
// Update a product in the database
const updateProduct = async (productId, updateData) => {
    const db = getDB();
    const result = await db.collection('products').updateOne(
        { _id: new ObjectId(productId) },
        { $set: updateData }
    );
    return result;
};
//delete a product from the database
const deleteOneProduct = async (productId) => {
    const db = getDB();
    const result = await db.collection('products').deleteOne({ _id: new ObjectId(productId) });
    return result;
};

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteOneProduct,
};