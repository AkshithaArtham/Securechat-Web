const { MessageModel, ConversationModel } = require('../models/ConversationModel');

const messages = async (req, res) => {
    try {
        const { msgId } = req.params; // The message ID to be deleted
        const { conversationId } = req.body; // The conversation ID to update after deletion

        // Find the message by ID and delete it
        const deletedMessage = await MessageModel.findByIdAndDelete(msgId);

        if (!deletedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }

        // Remove the message reference from the conversation
        await ConversationModel.updateOne(
            { _id: conversationId },
            { $pull: { messages: msgId } } // Remove the message from the messages array
        );

        return res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error("Error deleting message:", error);
        return res.status(500).json({ message: 'Error deleting the message' });
    }
};

module.exports = messages;
