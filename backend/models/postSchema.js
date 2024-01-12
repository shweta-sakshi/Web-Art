const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: "pic",
        //required:true
    },
    likes: [{ type: ObjectId, ref: "Users" }],
    comments: [{
        text: String,
        postedBy: { type: ObjectId, ref: "Users" }
    }],
    postedBy: {
        type: ObjectId,
        ref: "Users"
    }
}, { timestamps: true })

const post = new mongoose.model("Post", postSchema);

module.exports = post;