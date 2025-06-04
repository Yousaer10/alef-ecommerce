const { registerUser, loginUser } = require('../services/authService');

const register = async (req, res) => {
    try {
        const token = await registerUser(req.body);
        res.status(201).json( { token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const login = async (req, res) => {
    try {
        const token = await loginUser(req.body);
        res.status(200).json({ token });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
}

module.exports = {
    register,
    login
};