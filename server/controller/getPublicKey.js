const UserModel = require("../models/UserModel");

const mongoose = require("mongoose");

const getPublicKey = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }

        const user = await UserModel.findById(userId, "publicKey");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ publicKey: user.publicKey });
    } catch (error) {
        console.error("Error fetching public key:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = getPublicKey;
