import Sequelize from "sequelize"
import {} from 'dotenv/config'
const {DB_NAME, DB_USER, DB_PASSWORD} = process.env

export const sequelize = new Sequelize(
    DB_NAME,
    DB_USER, 
    DB_PASSWORD,
    {
        host: "localhost",
        dialect: "postgres",
        logging: false
    }
)
