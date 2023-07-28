const Message = require('./dao/models/messageModel');

class MessageManager {
  async getAllMessages() {
    try {
      const messages = await Message.find();
      return messages;
    } catch (error) {
      throw new Error('Error retrieving messages');
    }
  }

  async createMessage(user, message) {
    try {
      const newMessage = new Message({ user, message });
      await newMessage.save();
      return newMessage;
    } catch (error) {
      throw new Error('Error creating message');
    }
  }
}

module.exports = MessageManager;
