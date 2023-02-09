import express from "express"
import router from './routes/index.js'
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(cors({
    origin: '*'
}))

app.use('/', router)

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status)
    res.json({
        error:{
            status: error.status,
            message: error.message
        }
    });
});

export default app;