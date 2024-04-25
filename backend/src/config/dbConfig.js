import { Sequelize } from 'sequelize'
import { DB_CONN } from './config.js'

const DB_OPTIONS = {
    ...DB_CONN
}

Object.freeze(DB_OPTIONS)

export const sequelize = new Sequelize(DB_OPTIONS)


async function connectDB() {
    try {
        await sequelize.authenticate()
        return true
    } catch (error) {
        console.log(error)
        console.log(`Error in connecting DB`)
    }
}

connectDB().then((res) => {
    if(res) console.log(`DB connected...`)
})