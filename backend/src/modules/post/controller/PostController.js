import PostModel from "../model/PostModel.js"

class PostController {
    async createPost(req, res) {
        try {
            let params = req.body

            const response = await PostModel.createPost(params)
            if(response) {
                return res.status(200).send({status: 200, message: "Post Created Successfully", data: {post_id: response.id}})
            } 
            return res.status(400).send({status: 400, message: "error occured"})
        } catch (error) {
            res.status(500).send({status: 500, message: "Internal Server Error", error})
            
        }
    }

    async getPosts(req, res) {
        try {
            let params = req.query
            const response = await PostModel.getPosts({user_id: params.user_id})
            return res.status(200).send({status: 200, message: "success", data: [...response]})

        } catch (error) {
            res.status(500).send({status: 500, message: "Internal Server Error", error})
            
        }
    }

    async fetchTimeline(req, res) {
        try {
            let params = req.body
            const response = await PostModel.fetchTimeline(params)
            return res.status(200).send({status: 200, message: "success", data: [...response]})

        } catch (error) {
            res.status(500).send({status: 500, message: "Internal Server Error", error})
            
        }
    }
}

export default new PostController()