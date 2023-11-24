const express = require('express');
const authenticate = require('../middleware/authenticate');
const user = require("../models/userSchema");
const Chat = require("../models/chatSchema");
const Msg = require("../models/messageSchema");

const router = express.Router();

//fetching all  msg.
router.get("/allmessages/:chatId", authenticate, async (req, res) => {
    try {
        const messages = await Msg.find({ chat: req.params.chatId })
            .populate("sender", "fname email")
            .populate("chat");
        res.json(messages);
    } catch (error) {
        res.status(400);
        console.log(error);
        /* throw new Error(error.message); */
    }
})

//send msg.
router.post("/sendmessage", authenticate, async (req, res) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: req.userId,
        content: content,
        chat: chatId
    };

    try {
        var message = await Msg.create(newMessage);

        message = await message.populate("sender", "fname")
        message = await message.populate("chat")
        message = await user.populate(message, {
            path: "Chat.users",
            select: "fname email",
        });

        await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

        res.status(201).json(message);
    } catch (error) {
        res.status(422);
        throw new Error(error.message);
    }
});

module.exports = router;