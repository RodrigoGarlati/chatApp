import { sequelize } from "../database.js";
import { DataTypes } from "sequelize";

export const Message = sequelize.define('messages', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    transmitter: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    receiver: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})