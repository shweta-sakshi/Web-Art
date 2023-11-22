const express = require('express');
const authenticate = require('../middleware/authenticate');
const user = require("../models/userSchema");
const Chat = require("../models/chatSchema");

const router = express.Router();

//create or fetch one on one chat.
router.post('/accessChat', authenticate, async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        res.send("UserId param not sent with request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.userId } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "fname email")
        .populate("latestMessage");

    isChat = await Chat.populate(isChat, {
        path: "latestMessage.sender",
        select: "fname email",
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.userId, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "fname email"
            );
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400).json(error);
        }
    }
});

//Fetch all chats for a user.
router.get('/fetchchats', authenticate, async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.userId } } })
            .populate("users", "fname email")
            .populate("groupAdmin", "fname email")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await user.populate(results, {
                    path: "latestMessage.sender",
                    select: "fname email",
                });
                res.status(200).send(results);
            });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

//Create New Group Chat
router.post('/creategroup', authenticate, async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please Fill all the feilds" });
    }

    var users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return res
            .status(400)
            .send("More than 2 users are required to form a group chat");
    }

    users.push(req.userId);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.userId,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "fname email")
            .populate("groupAdmin", "fname email");

        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

//Rename the group.
router.put('/renamegroup', authenticate, async (req, res) => {
    const { chatId, name } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName: name,
        },
        {
            new: true,
        }
    )
        .populate("users", "fname email")
        .populate("groupAdmin", "fname email");

    if (!updatedChat) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(updatedChat);
    }
})

//Remove the member from group by admin.
router.put('/removefromgroup', authenticate, async (req, res) => {
    const { chatId, userId } = req.body;

    // check if the requester is admin

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId },
        },
        {
            new: true,
        }
    )
        .populate("users", "fname email")
        .populate("groupAdmin", "fname email");

    if (!removed) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(removed);
    }
})

//Add a new user to group by Admin.
router.put('/addtogroup', authenticate, async (req, res) => {
    const { chatId, userId } = req.body;

    // check if the requed user is admin

    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId },
        },
        {
            new: true,
        }
    )
        .populate("users", "fname email")
        .populate("groupAdmin", "fname email");

    if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(added);
    }
})

module.exports = router;