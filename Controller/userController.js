const userModel = require('../Model/userModel');

// get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// create user
const createUser = async (req, res) => {
    const user = req.body;
    // const query = { email: user.email };
    // console.log(user); { name: 'susu', email: 'sususalax393@gmail.com' }
    try {

        const existingUser = await userModel.findOne({ email: user.email });
        if (existingUser) return res.status(302).json({ message: "User Already exist" });
        const result = await userModel.create(user);
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}


// delete  user
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const deleteuser = await userModel.findByIdAndDelete(userId);
        if (!deleteuser) return res.status(404).json({ message: "User Not Found!" })
        res.status(200).json({ message: "Deleted Successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}





module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
}