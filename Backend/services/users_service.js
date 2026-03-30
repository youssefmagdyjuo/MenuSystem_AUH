const { getDB } = require('../db');
const { ObjectId } = require('mongodb');
// Fetch all users from the database
const getAllUsers = async () => {
    const db = getDB();
    return await db.collection('users').find().toArray();
};

// Get user by ID
const getUserById = async (userId) => {
    const db = getDB();
    return await db.collection('users').findOne({ _id: new ObjectId(userId) });
};

// Add a new user to the database
const addUser = async (userData) => {
    const db = getDB();
    const result = await db.collection('users').insertOne(userData);
    return result;
};

// Update a user in the database
const updateUser = async (userId, updateData) => {
    const db = getDB();
    const result = await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $set: updateData }
    );
    return result;
};

const updateUserPassword = async (userId, newPassword) => {
    const db = getDB();
    const result = await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $set: { password: newPassword } }
    );
    return result;
};

// Delete a user from the database
const deleteUser = async (userId) => {
    const db = getDB();
    const result = await db.collection('users').deleteOne({ _id: new ObjectId(userId) });
    return result;
};

module.exports.getAllUsers = getAllUsers;
module.exports.getUserById = getUserById;
module.exports.addUser = addUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUserPassword = updateUserPassword;
