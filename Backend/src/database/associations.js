import { User } from "./models/User.js";
import { Chat } from "./models/Chat.js";
import { Message } from "./models/Message.js";

User.belongsToMany(Chat, {through: 'userChats'})
Chat.belongsToMany(User, {through: 'userChats'})

Chat.hasMany(Message, {as: 'messages', foreignKey: 'chatId'})
Message.belongsTo(Chat, {as: 'chat'})