import UserModel from "../models/Users.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export function loginPage(req, res) {
  let pagename = "login";
  const error = req.query.error;
  res.render("login", { error, pagename });
}
export async function login(req, res) {
  try {
    const findUser = await UserModel.findOne({
      email: req.body.email,
    });
    if (findUser) {
      const isPasswordMatch = await bcrypt.compare(
        req.body.password,
        findUser.password
      );
      if (isPasswordMatch) {
        req.session.flashMessages.push({
          message: "Login successful",
          type: "success",
        });
        req.session.user = findUser;
        res.redirect("/");
      } else {
        req.session.flashMessages.push({
          message: "Invalid credentials",
          type: "error",
        });
        res.redirect("/login");
      }
    } else {
      req.session.flashMessages.push({
        message: "User not found",
        type: "error",
      });
      res.redirect("/login");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}
