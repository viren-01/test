import { Sequelize, Model, DataTypes } from 'sequelize'
import { sequelize } from '../../../config/dbConfig.js'

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    handle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dob: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'user',
    createdAt: false,
    updatedAt: false
})


class UserModel extends User {
    async registerUser(params) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await User.create(params, {raw: true})
                return resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
}

export default new UserModel()