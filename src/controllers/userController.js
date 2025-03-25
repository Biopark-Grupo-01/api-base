import User from "../models/usermodel.js";
import httpStatus from "http-status"

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne(req.params);

    res.hateos_item(user);
  } catch (err) {
    console.error(err);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        message: err.message,
      })
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.hateos_list(users);
  } catch (err) {
    console.error(err);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        message: err.message,
      })
  }
};

export const createUser = async (req, res, next) => {
  try {
    await new User(req.body).save();

    res
      .status(httpStatus.CREATED)
      .send();
  } catch (err) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        message: err.message
      })
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(req.params, req.body, {
      new: true,
    });

    res.hateos_item(user);
  } catch (err) {
    console.error(err);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        message: err.message,
      })
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.deleteOne(req.params);

    res
      .status(httpStatus.OK)
      .send()
  } catch (err) {
    console.error(err);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        message: err.message,
      })
  }
};