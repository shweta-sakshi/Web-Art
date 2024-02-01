const express = require('express');
const Post = require("../models/postSchema");
const router = new express.Router();
const authenticate = require("../middleware/authenticate");
const uploadOnCloudinary = require("../utils/Cloudinary.js");
const upload = require("../middleware/fileuploadmulter.js");

//to get all the posts of user.
router.get("/allPost", authenticate, (req, res) => {
    Post.find()
        //to expand the postedBy field in post and fetch the mentioned or all the info inside.
        .populate("postedBy", "_id fname email")
        .populate("comments.postedBy", "_id fname")
        .then(posts => {
            res.json({ posts });
        })
        .catch(err => {
            console.log(err);
        })
})

//get post of followed user.
router.get("/allPostfolow", authenticate, (req, res) => {
    //if postedBy is in the following list then return that post.
    Post.find({ postedBy: { $in: req.user.following } })
        //to expand the postedBy field in post and fetch the mentioned or all the info inside.
        .populate("postedBy", "_id fname email")
        .populate("comments.postedBy", "_id fname")
        .then(posts => {
            res.json({ posts });
        })
        .catch(err => {
            console.log(err);
        })
})

//to create user post.
router.post("/createpost", authenticate, upload.single("file"), async (req, res) => {
    const { title, body } = req.body;

    let cloudinaryResponse = null;

    if (!title || !body) {
        return res.status(422).json({ error: "Title and body required" });
    }

    try {
        // Check if file was uploaded and use the local file path
        if (req.file) {
            const localFilePath = req.file.path;
            // Upload the local file to Cloudinary

            cloudinaryResponse = await uploadOnCloudinary(localFilePath);
        }

        const post = new Post({
            title, body,
            photo: cloudinaryResponse ? cloudinaryResponse.url : "",//cloud url
            postedBy: req.rootUser
        })

        post.postedBy.password = undefined;
        post.postedBy.cpassword = undefined;
        post.postedBy.tokens = undefined;
        post.postedBy.__v = undefined;

        //save the post.
        const userPost = await post.save();

        //send success response.
        res.status(201).json({ status: 201, message: "post is saved successfully" });

        //send error response.
    } catch (err) {
        res.status(400).json({ status: 400, message: "Error while uploading the files" });
        console.log(err);
    }
})

//like post. 
//we can also use post but since we are updating it so we will use put.
router.put("/like", authenticate, (req, res) => {
    Post.findByIdAndUpdate(req.body.PostId, {
        $push: { likes: req.rootUser._id }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err });
        } else {
            res.json(result);
        }
    })
})

//for unlike post.
router.put("/unlike", authenticate, (req, res) => {
    Post.findByIdAndUpdate(req.body.PostId, {
        $pull: { likes: req.rootUser._id }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err });
        } else {
            res.json(result);
        }
    })
})

//comments.
router.put("/comment", authenticate, (req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.rootUser._id
    }
    Post.findByIdAndUpdate(req.body.PostId, {
        $push: { comments: comment }
    }, {
        new: true
    })
        .populate("comment.postedBy", "_id fname")
        .populate("postedBy", "_id fname")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err });
            } else {
                res.json(result);
            }
        })
})

//Delete comments
router.delete("/deletecomment/:postId", authenticate, (req, res) => {
    Post.comments.postedBy.findone({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .exe((err, post) => {
            if (err || !post) {
                return res.status(422).json({ error: err })
            }
            if (post.comments.postedBy._id.toString() === req.rootUser._id.toString()) {
                post.remove()
                    .then(result => {
                        req.json(result);
                    }).catch(err => {
                        console.log(err);
                    })
            }
        })
})


//Delete post.
router.delete("/deletepost/:postId", authenticate, (req, res) => {
    Post.findone({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .exe((err, post) => {
            if (err || !post) {
                return res.status(422).json({ error: err })
            }
            if (post.postedBy._id.toString() === req.rootUser._id.toString()) {
                post.remove()
                    .then(result => {
                        req.json(result);
                    }).catch(err => {
                        console.log(err);
                    })
            }
        })
})

module.exports = router;