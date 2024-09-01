import bcrypt from 'bcryptjs';
import User from '../../models/User';
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            const { password, ...otherData } = req.body;

            const existingUser = await User.findOne({ email: otherData.email });
            if (existingUser) {
                return res.status(400).json({ error: "User with this email already exists" });
            }

            if (password.length < 6) {
                return res.status(400).json({ error: "Password must be at least 6 characters long" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({ ...otherData, password: hashedPassword });
            await newUser.save();

            res.status(200).json({ success: "User created successfully", email: newUser.email });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(400).json({ error: "This method is not allowed" });
    }
}

export default connectDb(handler);
