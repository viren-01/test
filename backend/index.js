import express from 'express'
import cors from 'cors'
import { PORT } from './src/config/config.js'
import './src/config/dbConfig.js'
import AppRouter from './src/routes/AppRouter.js'

function connect() {
    const app = express()
    app.use(cors())
    app.use(express.json({limit: '10mb'}))
    app.use('/health', (req, res) => {
        res.send({ status: 200, message: 'success' })
    })

    app.use('/api', AppRouter)

    app.listen(PORT, (err) => {
        if(err) console.log('Error in starting server')
        console.log(`Server listening on port ${PORT}`)
    })
}

connect()