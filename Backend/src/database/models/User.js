import { sequelize } from '../database.js'
import {DataTypes} from 'sequelize'
import {Chat} from './Chat.js'

export const User = sequelize.define('users',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png'
    },
    chatId: {
        type: DataTypes.INTEGER
    }
});

User.hasMany(Chat, {
    foreignKey: "users[]",
    sourceKey: "id"
})

Chat.belongsTo(User, {
    foreignKey: "chatId",
    targetId: "id"
})