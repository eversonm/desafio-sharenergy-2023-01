const express = require("express");
const { check } = require("express-validator");

const usersControllers = require("../controllers/users-controllers");

const router = express.Router();

router.post(
  "/login", 
  [
    check("username").isLength({ min: 17 }),
    check("password").isLength({ min: 10 }),
  ],
  usersControllers.login
);

module.exports = router;
