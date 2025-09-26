const jwt = require('jsonwebtoken');
const path = require('path')

require("dotenv").config({path: path.join(__dirname, "../../.env")});


function authentications(req, res, next){
    const token = req.cookies.token;
    console.log("Token from cookie:", token)

    if(!token){
        return res.status(401).json({message: "Please Login or registser!"});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
        if(err){
            return res.status(403).json({message: "Invalid Token"});
        }

        req.user = result;
        next();
    })
}

module.exports = authentications;