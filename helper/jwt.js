// Description: JWT helper functions.
// Dependencies: jsonwebtoken
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

// Generate a JWT
function generateToken(payload) {
    console.log(payload)
    return jwt.sign(payload, secret);
}

// Verify a JWT
function verifyToken(token) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}
module.exports = { generateToken, verifyToken };