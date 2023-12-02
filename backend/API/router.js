const express = require('express');
const router = new express.Router();
const usrdb = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");


//for user registration
router.post("/register", async (req, res) => {

    const { fname, email, password, cpassword } = req.body

    if (!fname || !email || !password || !cpassword) {
        console.log("fill all the details");
        res.stataus(422).json({ error: "fill all the details" });
    }

    try {

        //we are cheking if email entered by user is already in database or not.
        //registretion will be done only for new users
        const preuser = await usrdb.findOne({/* database */email: email });

        if (preuser) {
            //console.log("user already exist");
            res.status(422).json({ error: "This Email already Exist" });
        } else if (password != cpassword) {
            res.status(422).json({ error: "Confirm password doesn't match" });
        } else {
            const finalUser = new usrdb({
                fname, email, password, cpassword
            });

            //here password hashing

            const storeData = await finalUser.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeData })
        }

    } catch (err) {
        res.status(422).json(err);
        console.log("catch error while registre");
    }
});

//for user Login
router.post("/login", async (req, res) => {
    //console.log(req.body);

    const { email, password } = req.body

    if (!email || !password) {
        res.stataus(422).json({ error: "fill all the details" });
    }

    try {
        const userValid = await usrdb.findOne({ email: email });

        if (userValid) {

            // debugging 

            const isMatch = await bcrypt.compare(password, userValid.password)

            if (!isMatch) {
                res.status(422).json({ error: "incorrect details" });
            } else {
                //we will be using JWT(token) for authentication through headers

                //Token generate
                const token = await userValid.generateAuthtoken();

                //we will use this token to generate cookie and use it in frontend

                //cookie generate
                res.cookie("usercookie", token, {
                    expires: new Date(Date.now() + 9000000),
                    httpOnly: true
                });

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({ status: 201, result });
            }
        }
    } catch (err) {
        res.status(401).json(err);
        console.log("catch error while login");
    }
})

//user valid
router.get("/validuser", authenticate, async (req, res) => {
    try {
        const ValidUserOne = await usrdb.findOne({ _id: req.userId });
        res.status(201).json({ status: 201, ValidUserOne });
    } catch (err) {
        //console.log("err");
        res.status(401).json({ status: 401, err });
    }
});

//user logout
//if user doesn't have token then we can't logout them
router.get("/logout", authenticate, async (req, res) => {
    try {

        //clear token
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        });

        //clear cookie
        const cookies = Object.keys(req.cookies);
        cookies.forEach(cookie => {
            res.clearCookie(cookie, { path: "/" });
        });

        try {
            await req.rootUser.save();
        } catch (error) {
            console.log("error while logout");
        }

        res.status(201).json({ status: 201 });

    } catch (error) {
        res.status(401).json({ status: 401, error });
    }
});

module.exports = router;
