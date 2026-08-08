const jwt = require('jsonwebtoken');

const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return token;
};

// const verifyToken = (token) => {
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         return decoded;
//     } catch (err) {
//         return null;
//     }
// };
