import User from "../model/userModel.js";

// create a user
export const createUser = async (req, res) => {
    try {
        const userData = new User(req.body);
        const { email } = userData;

        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(400).json({ message: "User already exists." })
        }
        const savedUser = await userData.save();
        res.status(200).json({ data: savedUser, message: "User created successfully" })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." })
    }
}

// get all users
export const fetch = async (req, res) => {
    try {
        const usersList = await User.find();
        if (usersList.length === 0) {
            return res.status(404).json({ message: "User Not Found" })
        }
        return res.status(200).json({ usersList });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." })
    }
}

// update a user
export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({ _id: id });
        console.log(id, userExist);

        if (!userExist) {
            return res.status(404).json({ message: "User not found" })
        } else {
            const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true })
            return res.status(201).json({ data: updatedUser, message: "updated successfully" })
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." })
    }
}

// single user
export const getSingleUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({ _id: id });

        if (!userExist) {
            return res.status(404).json({ message: "User not found" })
        } else {
            return res.status(200).json({ data: userExist, })
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." })
    }
}

// delete user
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({ _id: id });

        if (!userExist) {
            return res.status(404).json({ message: "User not found" })
        } else {
            const updatedUser = await User.findByIdAndDelete(id)
            return res.status(201).json({ data: updatedUser, message: "User deleted successfully" })
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." })
    }
}