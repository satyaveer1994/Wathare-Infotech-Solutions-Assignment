const userModel = require("../models/userModel");
const bookModel = require("../models/bookModel");

let createBook = async (req, res) => {
  try {
    const requestBody = req.body;
    if (Object.keys(data).length === 0) {
      return res.status(400).send({
        status: false,
        message: "Please enter Data like title etc",
      });
    }

    const { title, authorId, description, publishedDate } = requestBody;
    if (!title) {
      res
        .status(400)
        .send({ status: false, message: "book title is required" });
      return;
    }

    if (!authorId) {
      res.status(400).send({ status: false, message: "authorId is required" });
      return;
    }

    if (!description) {
      res
        .status(400)
        .send({ status: false, message: "descriptionis required" });
      return;
    }

    if (!publishedDate) {
      res
        .status(400)
        .send({ status: false, message: "publishedDate is required" });
      return;
    }

    let user = await userModel.findById(authorId);
    if (!user) {
      res.status(404).send({ status: false, message: "user not found" });
    }

    let titleUsed = await bookModel.findOne({ title });
    if (titleUsed) {
      return res
        .status(400)
        .send({ status: false, message: "title already used" });
    }

    const newBook = await bookModel.create(requestBody);
    res.status(201).send({ status: true, message: "Success", data: newBook });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const getBook = async (req, res) => {
  try {
    const { limit = 10, offset = 0, author, publishedDate } = req.query;

    const filter = {};

    if (author) {
      filter.author = author;
    }

    if (publishedDate) {
      filter.publishedDate = publishedDate;
    }

    const books = await bookModel
      .find(filter)
      .limit(parseInt(limit))
      .skip(parseInt(offset));
    if (books.length === 0) {
      return res.status(404).send({ status: true, message: "no book found" });
    }

    return res
      .status(200)
      .send({ status: true, message: "Books list", data: books });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getBooksById = async (req, res) => {
  try {
    const id = req.params.bookId;

    const isPresent = await bookModel.findById({ _id: id });

    if (!isPresent)
      return res.status(404).send({ status: false, message: "Book not found" });

    const book = await bookModel
      .findOne({ _id: id, isDeleted: false })
      .select({ isDeleted: 0 });

    if (!book)
      return res
        .status(400)
        .send({ status: false, message: "Book is deleted" });

    return res
      .status(200)
      .send({ status: true, message: "Success", data: newBook });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    let data = req.body;
    const id = req.params.bookId;

    const { title, description } = data;

    if (Object.keys(data).length === 0) {
      return res.status(400).send({
        status: false,
        message: "Please enter Data like title etc",
      });
    }

    const bookPresent = await bookModel.findById({ _id: id });

    if (!bookPresent)
      return res.status(404).send({ status: false, message: "Book not found" });

    let titleUsed = await bookModel.findOne({ title });
    if (titleUsed) {
      return res
        .status(400)
        .send({ status: false, message: "title must be Unique" });
    }

    if (data.isDeleted == true) {
      return res
        .status(400)
        .send({ status: false, message: "Book is already deleted" });
    }

    const update = await bookModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: data },
      { new: true }
    );

    if (!update)
      return res
        .status(400)
        .send({ status: false, message: "Book is Deleted" });

    return res
      .status(200)
      .send({ status: true, message: "Success", data: update });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await bookModel.findById(bookId);
    if (!book) {
      return res.status(404).send({ status: false, message: "Book not found" });
    }
    if (book.isDeleted == true) {
      return res
        .status(400)
        .send({ status: false, message: "Book is already deleted" });
    }
    const delBook = await bookModel.findByIdAndUpdate(
      bookId,
      { isDeleted: true },
      { new: true }
    );
    return res
      .status(200)
      .send({ status: true, message: "success", data: delBook });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createBook, getBook, getBooksById, updateBook, deleteBook };
