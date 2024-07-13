const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
// Generate a JWT
function generateToken(payload) {
    return jwt.sign(payload, secret, { expiresIn: '6h' });
}

// Verify a JWT
function verifyToken(token) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken,
};