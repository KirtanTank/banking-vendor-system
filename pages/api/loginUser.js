import bcrypt from 'bcryptjs';
import User from '../../models/User';
import connectDb from '../../middleware/mongoose';
import { signIn } from 'next-auth/react';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "No user found with this email" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: "Incorrect password" });
            }

            res.status(200).json({ success: "Logged in successfully", user });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(400).json({ error: "This method is not allowed" });
    }
}

export default connectDb(handler);
