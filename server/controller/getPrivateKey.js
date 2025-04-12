const UserModel = require("../models/UserModel");

const getPrivateKey = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await UserModel.findById(userId, 'encryptedPrivateKey');
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Assuming private key is part of the user model
        res.status(200).json({ privateKey: user.encryptedPrivateKey });
    } catch (error) {
        console.error("Error fetching private key:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = getPrivateKey;
