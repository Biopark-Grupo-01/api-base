import User from "../models/usermodel.js";
import httpStatus from "http-status"

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne(req.params);

    res
      .status(httpStatus.OK)
      .json({
        user,
        _links: {
          self: {
            href: `/api/users/${user._id}`,
          },
          update: {
            href: `/api/users/${user._id}`,
          },
          delete: {
            href: `/api/users/${user._id}`,
          },
        },
      })
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
    const user = await User.find();

    res
      .status(httpStatus.OK)
      .json({
        user,
        _links: {
          self: {
            href: "/api/users",
          },
          user: {
            href: "/api/users/:id",
          },
          create: {
            href: "/api/users",
          },
          update: {
            href: "/api/users/:id",
          },
          delete: {
            href: "/api/users/:id",
          },
        },
        meta: {
          count: user.length,
        },
      })
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
    const user = await new User(req.body).save();

    res
      .status(httpStatus.CREATED)
      .json({
        user,
        _links: {
          self: {
            href: `/api/users`,
          },
          user: {
            href: `/api/users/${user._id}`,
          },
          update: {
            href: `/api/users/${user._id}`,
          },
          delete: {
            href: `/api/users/${user._id}`,
          },
        },
      });
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

    res
      .status(httpStatus.OK)
      .json({
        user,
        _links: {
          self: {
            href: `/api/users/${user._id}`,
          },
          user: {
            href: `/api/users/${user._id}`,
          },
          create: {
            href: "/api/users",
          },
          delete: {
            href: `/api/users/${user._id}`,
          },
        }
      })
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