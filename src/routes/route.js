const express = require("express");
const router = express.Router();

const userController = require("../congrollers/userController");
const bookController = require("../congrollers/bookController");
const middelwears = require("../middelwears/auth");

router.post("/createUsers", userController.signup);
router.post("/login", userController.loginUser);

router.post("/books", middelwears.authenticaiton, bookController.createBook);

router.get("/books", middelwears.authenticaiton, bookController.getBook);

router.get(
  "/books/:Id",
  middelwears.authenticaiton,
  bookController.getBooksById
);

router.put(
  "/books/:Id",
  middelwears.authenticaiton,
  bookController.updateBook
);

router.delete(
  "/books/:Id",
  middelwears.authenticaiton,
  bookController.deleteBook
);

module.exports = router;
