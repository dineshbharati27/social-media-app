const Message = require('../models/Message');
const User = require('../models/User');

exports.getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await Message.find({ roomId })
      .populate('sender', 'name image')
      .populate('receiver', 'name image')
      .sort({ createdAt: 1 });

    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, content, roomId } = req.body;
    const senderId = req.userId;

    let messageData = {
      sender: senderId,
      receiver: receiverId,
      content,
      roomId,
      type: 'text'
    };

    // Handle file uploads
    if (req.file) {
      messageData.type = req.file.mimetype.startsWith('image/') ? 'image' : 'file';
      messageData.fileUrl = req.file.path; // Cloudinary URL
    }

    const message = await Message.create(messageData);
    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'name image')
      .populate('receiver', 'name image');

    res.json({ success: true, message: populatedMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};