import { Sequelize, Model, DataTypes } from 'sequelize'
import { sequelize } from '../../../config/dbConfig.js'

class Follower extends Model {}

Follower.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    follower_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'followers',
    createdAt: false,
    updatedAt: false
})


class FollowerModel extends Follower {
    async create(params) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await Follower.create(params, {raw: true})
                return resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
}

export default new FollowerModel()