import UserModel from "../model/UserModel.js"
import UserFollowerModel from "../model/UserFollowerModel.js"

class UserController {
    async registerUser(req, res) {
        try{
            let params = req.body

            const response = await UserModel.registerUser(params)
            if(response) {
                return res.status(200).send({status: 200, message: "User Created Successfully", data: {user_id: response.id}})
            } 
            return res.status(400).send({status: 400, message: "error occured"})
        } catch (err) {
            res.status(500).send({status: 500, message: "Internal Server Error", error: err})
        }
    }

    async followUser(req, res) {
        try{
            let params = req.query
            console.log("PAPAP", params)
            const response = await UserFollowerModel.create(params)
            if(response) {
                return res.status(200).send({status: 200, message: "success"})
            } 
            return res.status(400).send({status: 400, message: "error occured"})
        } catch (err) {
            res.status(500).send({status: 500, message: "Internal Server Error", error: err})
        }
    }
}

export default new UserController()