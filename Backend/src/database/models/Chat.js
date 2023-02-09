import { sequelize } from "../database.js";
import { DataTypes } from "sequelize";
import {Message} from "./Message.js"

export const Chat = sequelize.define('chats',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})
