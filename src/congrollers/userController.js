const userModel =require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length === 0) {
      return res.status(400).send({
        status: false,
        message: "Please enter Data like tile,fullname etc",
      });
    }
    const { name, email, password, phone } = data;

    if (!name) {
      return res
        .status(400)
        .send({ status: false, massage: "please enter name" });
    }

    if (!email) {
      return res
        .status(400)
        .send({ status: false, massage: "please enter email" });
    }

    // checking unique
    const user = await userModel.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .send({ status: false, message: "email already in use" });
    }

    if (!password) {
      return res
        .status(400)
        .send({ status: false, massage: "please enter password" });
    }
    if (!phone) {
      return res
        .status(400)
        .send({ status: false, massage: "please enter phone" });
    }

    const hash = bcrypt.hashSync(password, 6);
    data.password = hash;

    let createUser = await userModel.create(data);

    return res
      .status(201)
      .send({ status: true, message: "successful", data: createUser });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    Data = req.body;

    if (Object.keys(Data) == 0) {
      return res.status(400).send({
        status: false,
        message: "Please provide email id or password",
      });
    }
    const { email, password } = Data;
    if (!email) {
      return res
        .status(400)
        .send({ status: false, message: `Email is required` });
    }

    if (!password) {
      res.status(400).send({ status: false, message: `password is required` });
      return;
    }

    const user = await userModel.findOne({ email: email });
    if (user) {
      return res
        .status(401)
        .send({ status: false, message: " this email is alrady exist" });
    }
    const decrpted = bcrypt.compareSync(password, user.password);
    if (decrpted == true) {
      const token = jwt.sign(
        {
          UserId: user._id,
        },
        "Secret-Key-given-by-us-to-secure-our-token"
      );

      res.header("x-auth-header", token); //.send(_.pick(user, ['_id', 'name', 'email']))

      return res
        .status(200)
        .send({ status: true, message: "login Successful", token: token });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports={signup,loginUser}