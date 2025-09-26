const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

exports.register = (req, res) => {
  const { username, email, dob, password } = req.body;

  userModel.findByEmail(email, (err, res1) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (res1.length > 0) {
      return res.status(400).json({ message: `${email} already registered!` });
    }

    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "error is hashing password" });
      }
      userModel.register(username, email, dob, hash, (err) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }

        const link = `http://localhost:3000/auth/verify-email?email=${encodeURIComponent(
          email
        )}`;
        const messanger = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
          },
        });

        const mail = {
          to: email,
          subject: `Hi ${username}, Please Verify Your Email`,
          html: `<p>Please verify your email by clicking the link below:</p><a href="${link}">Verify Email</a><p>This helps us ensure it's really you!</p>`,
        };

        messanger.sendMail(mail, (err) => {
          if (err) {
            return res.status(500).json({ message: err });
          }

          return res.status(201).json({
            message:
              "Registration Successfull! Please Check Your Email to Verify Your Email",
          });
        });
      });
    });
  });
};

exports.verifyEmail = (req, res) => {
  const { email } = req.query;

  userModel.verifyEmail(email, (err, result) => {
    if (err) {
      return res.status(500).json({ err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `${email} not found!` });
    }

    return res.status(200).json({ message: "Email verified!" });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  userModel.findByEmail(email, (err1, result) => {
    if (err1) {
      return res.status(500).json({ message: err1.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Acc not found" });
    }

    userModel.checkVerif(email, (err2, result1) => {
      if (err2) {
        return res.status(500).json({ message: err2 });
      }

      if (result1.length === 0) {
        return res.status(404).json({ message: "Email is not verified!" });
      }

      const user = result[0];
      bcrypt.compare(password, user.password, function (err, passres) {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ message: "error in comparing password" });
        }

        if(!passres){
            return res.status(404).json({message: "Password is incorrect!"});
        }

        if (passres) {
          const secret = process.env.JWT_SECRET;
          const token = jwt.sign(
            {
              userid: user.id,
              email: user.email,
              role: user.role,
            },
            secret
          );
          res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
          });
          return res
            .status(200)
            .json({ message: `Welcome Back!` });
        }
      });
    });
  });
};

exports.logout = (req, res) => {
  const user = req.user.userid;

  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  });

  return res.status(200).json({ message: "Log Out Successfull!" });
};

exports.profile = (req, res) => {
  const userid = req.user.userid;

  userModel.profile(userid, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Profile Not Found!" });
    }
  
    return res.status(200).json({ 
      username: result[0].username,
      email:  result[0].email,
      date_of_birth: result[0].date_of_birth,
      role: result[0].role,
      address: result[0].address

     });
  });
};

exports.updateProfile = (req, res) => {
  const id = req.user.userid;
  const updates = req.body;

  userModel.updateProfile(id, updates, (err, result) => {
    if(err){
      return res.status(500).json({message: err});
    }

    if(result.affectedRows === 0){
      return res.status(404).json({message: "No Profile Updated!"})
    }

    return res.status(200).json({message: "Profile Updated!"});
  })
}
