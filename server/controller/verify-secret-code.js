const UserModel = require("../models/UserModel");
const bcryptjs = require('bcryptjs');

async function verifySecretCode(req, res) {
    try {
        const { secretCode,userId } = req.body;
        console.log(secretCode);
        console.log(userId);
        // Find the user by ID
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true
            });
        }
        console.log(secretCode);
        // Compare the entered secret code with the stored hashed secret code
        const isMatch = await bcryptjs.compare(secretCode, user.secretcode);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid secret code",
                error: true
            });
        }

        return res.status(200).json({
            message: "Secret code verified successfully",
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal server error",
            error: true
        });
    }
}

module.exports = verifySecretCode;
