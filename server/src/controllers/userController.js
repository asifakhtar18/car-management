const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/config');


const generateToken = async (user) => {
    const token = await jwt.sign({ _id: user._id.toString() }, JWT_SECRET);
    return token;
};



exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).send({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send({ error: 'User already exists' });
        }

        const user = new User({ email, password, name });
        await user.save();
        const token = await generateToken(user);
        res.status(201).send({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error })
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ error: 'All fields are required' });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }

        const token = await generateToken(user);
        res.send({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed" })
    }
};
