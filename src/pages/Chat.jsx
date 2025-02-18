import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Search, Video } from 'lucide-react';

const Chat = () => {
  const { user, allUsers } = useSelector(state => state.auth);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);

  // Filter followed users
  const followedUsers = allUsers?.filter(u => 
    user?.following?.includes(u._id) &&
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dummy chat data - replace with real chat data from your backend
  const dummyChats = [
    { id: 1, sender: user?._id, text: "Hey, how are you?", timestamp: "10:30 AM" },
    { id: 2, sender: "other", text: "I'm good, thanks! How about you?", timestamp: "10:31 AM" },
    { id: 3, sender: user?._id, text: "Doing great! Working on some new features.", timestamp: "10:32 AM" },
    { id: 1, sender: user?._id, text: "Hey, how are you?", timestamp: "10:30 AM" },
    { id: 2, sender: "other", text: "I'm good, thanks! How about you?", timestamp: "10:31 AM" },
    { id: 3, sender: user?._id, text: "Doing great! Working on some new features.", timestamp: "10:32 AM" },
    { id: 1, sender: user?._id, text: "Hey, how are you?", timestamp: "10:30 AM" },
    { id: 2, sender: "other", text: "I'm good, thanks! How about you?", timestamp: "10:31 AM" },
    { id: 3, sender: user?._id, text: "Doing great! Working on some new features.", timestamp: "10:32 AM" },
    { id: 1, sender: user?._id, text: "Hey, how are you?", timestamp: "10:30 AM" },
    { id: 2, sender: "other", text: "I'm good, thanks! How about you?", timestamp: "10:31 AM" },
    { id: 3, sender: user?._id, text: "Doing great! Working on some new features.", timestamp: "10:32 AM" },
    { id: 1, sender: user?._id, text: "Hey, how are you?", timestamp: "10:30 AM" },
    { id: 2, sender: "other", text: "I'm good, thanks! How about you?", timestamp: "10:31 AM" },
    { id: 3, sender: user?._id, text: "Doing great! Working on some new features.", timestamp: "10:32 AM" },
    { id: 1, sender: user?._id, text: "Hey, how are you?", timestamp: "10:30 AM" },
    { id: 2, sender: "other", text: "I'm good, thanks! How about you?", timestamp: "10:31 AM" },
    { id: 3, sender: user?._id, text: "Doing great! Working on some new features.", timestamp: "10:32 AM" },
    { id: 1, sender: user?._id, text: "Hey, how are you?", timestamp: "10:30 AM" },
    { id: 2, sender: "other", text: "I'm good, thanks! How about you?", timestamp: "10:31 AM" },
    { id: 3, sender: user?._id, text: "Doing great! Working on some new features.", timestamp: "10:32 AM" },
    { id: 1, sender: user?._id, text: "Hey, how are you?", timestamp: "10:30 AM" },
    { id: 2, sender: "other", text: "I'm good, thanks! How about you?", timestamp: "10:31 AM" },
    { id: 3, sender: user?._id, text: "Doing great! Working on some new features.", timestamp: "10:32 AM" },
    { id: 1, sender: user?._id, text: "Hey, how are you?", timestamp: "10:30 AM" },
    { id: 2, sender: "other", text: "I'm good, thanks! How about you?", timestamp: "10:31 AM" },
    { id: 3, sender: user?._id, text: "Doing great! Working on some new features.", timestamp: "10:32 AM" },
    { id: 1, sender: user?._id, text: "Hey, how are you?", timestamp: "10:30 AM" },
    { id: 2, sender: "other", text: "I'm good, thanks! How about you?", timestamp: "10:31 AM" },
    { id: 3, sender: user?._id, text: "Doing great! Working on some new features.", timestamp: "10:32 AM" },
    { id: 1, sender: user?._id, text: "Hey, how are you?", timestamp: "10:30 AM" },
    { id: 2, sender: "other", text: "I'm good, thanks! How about you?", timestamp: "10:31 AM" },
    { id: 3, sender: user?._id, text: "Doing great! Working on some new features.", timestamp: "10:32 AM" },
    { id: 1, sender: user?._id, text: "Hey, how are you?", timestamp: "10:30 AM" },
    { id: 2, sender: "other", text: "I'm good, thanks! How about you?", timestamp: "10:31 AM" },
    { id: 3, sender: user?._id, text: "Doing great! Working on some new features.", timestamp: "10:32 AM" },
    { id: 1, sender: user?._id, text: "Hey, how are you?", timestamp: "10:30 AM" },
    { id: 2, sender: "other", text: "I'm good, thanks! How about you?", timestamp: "10:31 AM" },
    { id: 3, sender: user?._id, text: "Doing great! Working on some new features.", timestamp: "10:32 AM" },
    { id: 1, sender: user?._id, text: "Hey, how are you?", timestamp: "10:30 AM" },
    { id: 2, sender: "other", text: "I'm good, thanks! How about you?", timestamp: "10:31 AM" },
    { id: 3, sender: user?._id, text: "Doing great! Working on some new features.", timestamp: "10:32 AM" },
    { id: 1, sender: user?._id, text: "Hey, how are you?", timestamp: "10:30 AM" },
    { id: 2, sender: "other", text: "I'm good, thanks! How about you?", timestamp: "10:31 AM" },
    { id: 3, sender: user?._id, text: "Doing great! Working on some new features.", timestamp: "10:32 AM" },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add message sending logic here
    console.log("Sending message:", message);
    setMessage('');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-white border-r">
        {/* App Name */}
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Vibesta</h1>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="overflow-y-auto h-[calc(100vh-140px)]">
          {followedUsers?.map(followedUser => (
            <div
              key={followedUser._id}
              onClick={() => setSelectedUser(followedUser)}
              className={`flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer ${
                selectedUser?._id === followedUser._id ? 'bg-blue-50' : ''
              }`}
            >
              <img
                src={followedUser.image}
                alt={followedUser.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-gray-900">{followedUser.name}</h3>
                <p className="text-sm text-gray-500">Click to chat</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-white border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={selectedUser.image}
                  alt={selectedUser.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <h2 className="font-medium text-gray-900">{selectedUser.name}</h2>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Video className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
              {dummyChats.map(chat => (
                <div
                  key={chat.id}
                  className={`flex ${chat.sender === user?._id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      chat.sender === user?._id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    <p>{chat.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {chat.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;