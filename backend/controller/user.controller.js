import User from '../model/user.model.js'
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already Exist" });
        }
        const hashpassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname, email, password: hashpassword
        })
        await createdUser.save();
        res.status(201).json({
            message: "User Created Successfully", user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email
            }
        });
    } catch (error) {
        console.log("Error : " + error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "No Such User" });
        }
        const isMatch = await bcryptjs.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credential" });
        }
        return res.status(200).json({
            message: "Login Successfull", user: {
                _id: user._id,
                fullname: user.fullname,
                email
            }
        })
    } catch (error) {
        console.log("Error : ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}