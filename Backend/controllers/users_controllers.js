const { getAllUsers, addUser, updateUser, deleteUser ,updateUserPassword} = require('../services/users_service');
const bcrypt = require('bcryptjs');
const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

// GET METHOD FETCH ALL USERS
const getUsers_controller = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json({
            results: users.length,
            success: true,
            message: "Users fetched successfully",
            data: users
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching users",
            error: err.message
        });
        console.log(err);
    }
}

// ADD A NEW USER
const addUser_controller = async (req, res) => {
    try {

        const { userName, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            userName,
            password:hashedPassword
        }
        const result = await addUser(newUser);
        res.status(201).json({
            success: true,
            message: "User added successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding user",
            error: error.message
        });
    }
}

// UPDATE A USER
const updateUser_controller = async (req, res) => {
    try {
        const { id } = req.params;
        const {userName} = req.body;
        const result = await updateUser(id, {userName});
        res.json({
            success: true,
            message: "User updated successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating user",
            error: error.message
        });
    }
}

const updateUserPassword_controller = async (req, res) => {
    try {
        const { id } = req.params;
        const { currentPassword, newPassword } = req.body;

        // Fetch user from DB
        const db = getDB();
        const user = await db.collection('users').findOne({ _id: new ObjectId(id) });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Compare current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        // Hash new password and update
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const result = await updateUserPassword(id, hashedPassword );

        res.json({
            success: true,
            message: "User password updated successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating user password",
            error: error.message
        });
    }
};
// DELETE A USER
const deleteUser_controller = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteUser(id);
        res.json({
            success: true,
            message: "User deleted successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting user",
            error: error.message
        });
    }
}

module.exports = {
    getUsers: getUsers_controller,
    addUser: addUser_controller,
    updateUser: updateUser_controller,
    deleteUser: deleteUser_controller,
    updateUserPassword: updateUserPassword_controller
};