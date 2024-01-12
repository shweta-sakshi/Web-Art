const express = require('express');
const Post = require("../models/postSchema");
const user = require("../models/userSchema");
const router = new express.Router();
const authenticate = require("../middleware/authenticate");

//To see other user Post.
router.get("/user/:id", authenticate, async (req, res) => {
    try {
        const User = await user.findOne({ _id: req.params.id })
            .select("fname email")
        const posts = await Post.find({ postedBy: req.params.id })
            .populate("postedBy", "_id fname")
        res.json({ User, posts })
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(404).json({ error: "Invalid user ID" });
        }
        return res.status(422).json({ error: err });
    }
});

//Follow other users.
router.put('/follow', authenticate, async (req, res) => {
    try {
        //updating the followed user following array.
        const followedUser = await user.findByIdAndUpdate(req.body.followId, {
            $push: { followers: req.userId }
        }, {
            new: true
        }).select("fname _id email")

        //updating the array of following user.
        const followinguser = await user.findByIdAndUpdate(req.userId, {
            $push: { following: req.body.followId }
        }, {
            new: true
        }).select("fname _id email")
        res.json({ followedUser, followinguser })
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(422).json({ error: "Invalid user ID" });
        } else {
            return res.status(500).json({ error: "Server error" });
        }
    }

});

//unfollow other user.
router.put('/unfollow', authenticate, async (req, res) => {
    try {
        //updating array of followers
        const unfollowedUser = await user.findByIdAndUpdate(req.body.unfollowId, {
            $pull: { followers: req.userId }
        }, {
            new: true
        })

        //updating array of following user.
        const unfollowinguser = await user.findByIdAndUpdate(req.userId, {
            $pull: { following: req.body.unfollowId }
        }, {
            new: true
        })

        res.json({ unfollowedUser, unfollowinguser })

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(422).json({ error: "Invalid user ID" });
        } else {
            return res.status(500).json({ error: "Server error" });
        }
    }

});

module.exports = router;