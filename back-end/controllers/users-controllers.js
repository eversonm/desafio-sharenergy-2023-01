const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret_key = process.env.JWT_KEY;
const HttpError = require("../models/http-error");
const User = require("../models/user");

const login = async (req, res, next) => {
  // #swagger.tags= ['Login']
  // #swagger.description = 'Log in a user'
  /* #swagger.parameters['User'] = {
      in: 'body',
      description: 'User Login.',
      schema: {
          $ref: "#/definitions/loginUser"
      }
  } */

  const errors = validationResult(req);
  // console.log(req.body)
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalids inputs passed, please check your user data.", 422)
    );
  }
  const { username, password, remember } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed! Please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials! Could not log you in.",
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = password.localeCompare(existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again"
    );
    return next(error);
  }

  if (isValidPassword !== 0) {
    const error = new HttpError(
      "Invalid credentials! Could not log you in.",
      403
    );
    return next(error);
  }

  let token;
  try {
    if (remember === "true") {
      token = jwt.sign(
        { userId: existingUser.id, username: existingUser.username },
        secret_key,
        { expiresIn: "30d" }
      );
    } else {
      token = jwt.sign(
        { userId: existingUser.id, username: existingUser.username },
        secret_key,
        { expiresIn: "1h" }
      );
    }
  } catch (err) {
    const error = new HttpError("Logging in failed! Please try again.", 500);
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    username: existingUser.username,
    token: token,
  });
};

module.exports = {
  login,
};
