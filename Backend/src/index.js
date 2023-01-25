import app from './App.js'
import {sequelize} from './database/database.js'
import './database/models/User.js'
import './database/models/Message.js'
import './database/models/Chat.js'

const PORT = 4000

async function main(){
    try {
        await sequelize.sync({force: true})
        app.listen(PORT, ()=>{
            console.log(`Server listening on port ${PORT} :)`)
        }) 
    } catch (error) {
        console.log(error)
    }
  
};

main();