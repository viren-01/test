import { Sequelize, Model, DataTypes, QueryTypes } from 'sequelize'
import { sequelize } from '../../../config/dbConfig.js'

class Post extends Model { }

Post.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'post',
    createdAt: false,
    updatedAt: false
})


class PostModel extends Post {
    async createPost(params) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await Post.create(params, { raw: true })
                return resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    async getPosts(params) {
        return new Promise(async (resolve, reject) => {
            try {
                let where = ``
                let replacements = []

                if (params.user_id) {
                    where += `AND user_id = ?`
                    replacements.push(params.user_id)
                }

                where += ` ORDER BY id DESC`

                let sql = `SELECT id, title, body, user_id from post WHERE 1=1 ${where}`

                const response = await sequelize.query(sql, { type: QueryTypes.SELECT, raw: true, replacements, logging: true })
                return resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    async fetchTimeline(params) {
        return new Promise(async (resolve, reject) => {
            try {
                
                let subquery = ``
                let replacements = []

                if (params.user_id) {
                    subquery += `AND user_id IN (SELECT user_id FROM followers WHERE follower_id = :user_id)`
                    replacements.push(params.user_id)
                }

                subquery += ` ORDER BY id DESC`
                let sql = `SELECT id, title, body, user_id from post
                            WHERE 1=1 ${subquery}`

                const response = await sequelize.query(sql, { type: QueryTypes.SELECT, raw: true, replacements, logging: true })
                return resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
}

export default new PostModel()