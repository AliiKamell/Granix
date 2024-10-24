const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../models/user.model");
const appError = require("../utilities/appError");
const httpStatusText = require("../utilities/httpStatusText");
const bcrypt = require("bcryptjs");
const generateJWT = require("../utilities/generateJWT");

const getAllUsers = asyncWrapper(async (req, res) => {
  const query = req.query;

  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  const users = await User.find(
    {},
    {
      __v: false,
      token: false,
    }
  )
    .limit(limit)
    .skip(skip);
  res.json({ status: httpStatusText.SUCCESS,  users });
});

const register = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    const error = appError.create(
      "user already existes",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    avatar: req.file.filename,
  });

  const token = await generateJWT({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role,
  });

  newUser.token = token;

  await newUser.save();

  res.status(201).json({ status: httpStatusText.SUCCESS,  newUser });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && !password) {
    const error = appError.create(
      "email and password are required",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    const error = appError.create("user not found", 400, httpStatusText.FAIL);
    return next(error);
  }

  const matchedPassword = await bcrypt.compare(password, user.password);

  if (user && matchedPassword) {
    const token = await generateJWT({
      email: user.email,
      id: user._id,
      role: user.role,
    });
    return res.json({
      status: httpStatusText.SUCCESS,
      data: { token: token },
    });
  } else {
    const error = appError.create(
      "something went wrong",
      500,
      httpStatusText.Error
    );
    return next(error);
  }
});

const deleteUser = asyncWrapper(async (req, res) => {
  const data = await User.deleteOne({ _id: req.params.userId });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});

module.exports = { getAllUsers, register, login, deleteUser };
