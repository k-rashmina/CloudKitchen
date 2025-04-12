const bcrypt = require("bcrypt");
const User = require("../models/User");

const userSignup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if username or email is already taken
        const existingUser = await User.findOne({ $or: [{ name }, { email }] });

        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role
        });

        await newUser.save();

        return res.status(201).json({ message: "Successfully registered. Please login." });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = userSignup;
