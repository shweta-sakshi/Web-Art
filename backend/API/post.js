const express = require('express');
const router = new express.Router();
const Post = require("../models/postSchema");
const authenticate = require("../middleware/authenticate");

//to get all the posts of user.
router.get("/allPost", (req,res)=>{
    Post.find()

    //to expand the postedBy field in post and fetch the mentioned or all the info inside.
    .populate("postedBy","_id fname email")
    .populate("comments.postedBy","_id fname")
    .then(posts=>{
        res.json({posts});
    })
    .catch(err=>{
        console.log(err);
    })
})

//to create user post.
router.post("/createpost", authenticate, async (req, res) => {
    const { title, body, photo } = req.body;

    if (!title || !body) {
        return res.status(422).json({ error: "Title and body required" });
    }

    try {

        const post = new Post({
            title, body, photo,
            postedBy: req.rootUser
        })
    
        post.postedBy.password=undefined;
        post.postedBy.cpassword=undefined;
        post.postedBy.tokens=undefined;
        post.postedBy.__v=undefined;
        const userPost = await post.save();
        res.status(201).json({ "post": userPost });

    } catch (err) {
        console.log(err);
    }
})

//this is user specific.
router.get("/mypost",authenticate, (req,res)=>{
    Post.find({postedBy:req.rootUser._id})
    .populate("postedBy", "_id fname email")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err);
    })
})

//like post. 
//we can also use post but since we are updating it so we will use put.
router.put("/like", authenticate, (req,res)=>{
    Post.findByIdAndUpdate(req.body.PostId,{
        $push:{likes:req.rootUser._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err});
        }else{
            res.json(result);
        }
    })
})

//for unlike post.
router.put("/unlike", authenticate, (req,res)=>{
    Post.findByIdAndUpdate(req.body.PostId,{
        $pull:{likes:req.rootUser._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err});
        }else{
            res.json(result);
        }
    })
})

//comments.
router.put("/comment", authenticate, (req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.rootUser._id
    }
    Post.findByIdAndUpdate(req.body.PostId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comment.postedBy","_id fname")
    .populate("postedBy","_id fname")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err});
        }else{
            res.json(result);
        }
    })
})

//Delete comments
router.delete("/deletecomment/:postId", authenticate, (req,res)=>{
    Post.comments.postedBy.findone({_id:req.params.postId})
    .populate("postedBy","_id")
    .exe((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.comments.postedBy._id.toString() === req.rootUser._id.toString()){
            post.remove()
            .then(result=>{
                req.json(result);
            }).catch(err=>{
                console.log(err);
            })
        }
    })
})


//Delete post.
router.delete("/deletepost/:postId", authenticate, (req,res)=>{
    Post.findone({_id:req.params.postId})
    .populate("postedBy","_id")
    .exe((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.rootUser._id.toString()){
            post.remove()
            .then(result=>{
                req.json(result);
            }).catch(err=>{
                console.log(err);
            })
        }
    })
})

module.exports = router;