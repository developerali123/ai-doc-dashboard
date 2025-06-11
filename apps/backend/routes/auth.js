const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const validate = require("../middleware/validate");

const router = express.Router();

router.post(
  "/register",
  validate([
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ]),
  authController.register
);

router.post(
  "/login",
  validate([
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ]),
  authController.login
);

module.exports = router;
