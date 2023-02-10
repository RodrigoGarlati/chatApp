import http from 'http'
import app from './App.js'
import {sequelize} from './database/database.js'
import { Server } from 'socket.io'
import './database/models/User.js'
import './database/models/Message.js'
import './database/models/Chat.js'
import './database/associations.js'

const PORT = 4000

const server = http.createServer(app)
export const io = new Server(server)

const main = async function (){
    try {
        await sequelize.sync({force: true})
        server.listen(PORT, ()=>{
            console.log(`Server listening on port ${PORT} :)`)
        })
        io.on('connection', ()=>{
            console.log('new connection')
        }) 
    } catch (error) {
        console.log(error)
    }
  
};

main();