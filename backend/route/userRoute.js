const express = require('express')
const route = express.Router();
const token = require('../middleware/tokenAuth');
const userCon = require("../controller/userController");

route.post("/auth/login", userCon.login);
route.post("/auth/register", userCon.register);
route.post("/auth/logout", token, userCon.logout);
route.get("/auth/verify-email", userCon.verifyEmail);
route.get("/auth/me", token, (req, res) => {
    res.json({
        userid: req.user.userid,
        role: req.user.role
    })
})

route.get("/profile/view", token, userCon.profile);
route.patch("/profile/update", token, userCon.updateProfile);


module.exports = route;