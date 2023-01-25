import { sequelize } from "../database.js";
import { DataTypes } from "sequelize";
import {Message} from "./Message.js"

export const Chat = sequelize.define('chats',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    messageId: {
        type: DataTypes.STRING
    },
    users: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
    }
})

Chat.hasMany(Message, {
    foreignKey: "chatId",
    sourceKey: "id"
})

Message.belongsTo(Chat, {
    foreignKey: "messageId",
    targetId: "id"
})