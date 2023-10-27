import UserModel from "../models/Users.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export function registerPage(req, res) {
  let pagename = "register";
  res.render("register", { pagename });
}
export async function register(req, res) {
  // Traitement des erreurs
  let checkLength = req.body.password.length >= 3;
  let checkPasswords = req.body.password === req.body.password_confirm;
  const checkUser = await UserModel.findOne({
    email: req.body.email,
  });
  if (!checkLength) {
    req.session.flashMessages.push({
      message: "Password must be at least 3 characters long!",
      type: "error",
    });
  }
  if (!checkPasswords) {
    req.session.flashMessages.push({
      message: "Passwords do not match!",
      type: "error",
    });
  }
  if (checkUser) {
    req.session.flashMessages.push({
      message: "User already exists!",
      type: "error",
    });
  }
  //
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  try {
    if (!checkPasswords || !checkLength || checkUser) {
      res.redirect("/register?error=samepw");
    } else {
      const user = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      });
      console.log(user);
      await user.save();
      req.session.flashMessages.push({
        message: "Successfully registered",
        type: "success",
      });
      res.redirect("/login");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}
