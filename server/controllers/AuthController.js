const User = require('../models/userModel');
const { createSecretToken } = require('../utils/jwtToken');
const bcrypt = require('bcrypt');

const loginUser = async (req, res, next) => {
    try {
        const { email = '', password = '' } = req.body;
        if (email && password) {
            const user = await User.findOne({ email });
            if (user) {
                const passsWordMatch = await bcrypt.compare(password, user?.password);
                if (passsWordMatch) {
                    const userData = user.toObject();
                    delete userData.password;
                    const authToken = createSecretToken(user._id);
                    return res.json({ message: 'Logged in Successfully', authToken, userData });
                }
            }
            return res.status(400).json({ data: [], message: 'Invalid email or password!' })
        }
    } catch (error) {
        res.status(400).json({ message: 'Some Error Occured', error })
    }
}

const registerUser = async (req, res, next) => {
    const { name = '', email = '', password = '' } = req.body;
    try {
        if (!name?.length) {
            return res.status(400).json({ message: 'Please Enter a Valid name', data: [] });
        }
        if (!email.length) {
            return res.status(400).json({ message: 'Please Enter a Valid email', data: [] });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password should be atleast 8 characters long!', data: [] });
        }
        const userRegistered = await User.findOne({ email });
        if (userRegistered) {
            return res.status(400).json({ message: 'This email is already registered!', data: [] });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        const data = await  newUser.save();
        const authToken = createSecretToken(data._id);
        const userData = data.toObject();
        delete userData.password;
        return res.json({ message: 'Account Created Successfully!', authToken, userData })
    } catch (error) {
        return res.status(400).json({ message: 'Some Error Occured', error });
    }
}

module.exports = {
    loginUser,
    registerUser,
}