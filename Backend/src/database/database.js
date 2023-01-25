import Sequelize from "sequelize"
// import { User } from "./models/User.js"
// import { Message } from "./models/Message.js"
// import { Chat } from "./models/Chat.js"
import {} from 'dotenv/config'
const {DB_NAME, DB_USER, DB_PASSWORD} = process.env

export const sequelize = new Sequelize(
    DB_NAME,
    DB_USER, 
    DB_PASSWORD,
    {
        host: "localhost",
        dialect: "postgres"
    }
)

// User.hasMany(Chat, {
//     foreignKey: "chatId"
// })
// Chat.belongsTo(User)

// Chat.hasMany(Message, {
//     foreignKey: "messageId"
// })
// Message.belongsTo(Chat)
