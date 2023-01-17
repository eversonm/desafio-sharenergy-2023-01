const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret_key = process.env.JWT_KEY;
const HttpError = require("../models/http-error");
const User = require("../models/user");

const signup = async (req, res, next) => {
  // #swagger.path = '/api/users/'
  // #swagger.tags= ['Users']
  // #swagger.description = 'Create a new user using name, email and password'
  /* #swagger.parameters['User'] = {
        in: 'body',
        description: 'Create a new user.',
        schema: {
            $ref: "#/definitions/signup"
        }
    } */

  const errors = validationResult(req);
  // console.log(req.body)
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalids inputs passed, please check your user data.", 422)
    );
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed! Please try again later.",
      500
    );
    return next(error);
  }
  if (existingUser) {
    const error = new HttpError(
      "User exists already! Please login instead.",
      422
    );
    return next(error);
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    places: [],
  });

  try {
    await createdUser.save(); //handle all mongoDB code to save and store a document
  } catch (err) {
    console.log(err);
    const error = new HttpError("Signing up failed! Please try again.", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      secret_key,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Signing up failed! Please try again.", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ user: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  // #swagger.tags= ['Users']
  // #swagger.description = 'Log in a user'
  /* #swagger.parameters['User'] = {
      in: 'body',
      description: 'User Login.',
      schema: {
          $ref: "#/definitions/loginUser"
      }
  } */
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
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
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again"
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials! Could not log you in.",
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      secret_key,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Logging in failed! Please try again.", 500);
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

module.exports = {
  signup,
  login,
};
