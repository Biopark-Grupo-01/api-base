import User from "../models/usermodel.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne(req.params);

    res.hateoas_item(user);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.hateoas_list(users);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    await new User({
      name,
      email,
      password,
    }).save();

    res.CREATED();
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOneAndUpdate(req.params,{
      name,
      email,
      password,
    }, {
      new: true,
    });

    res.hateoas_item(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.deleteOne(req.params);

    res.NO_CONTENT();
  } catch (err) {
    next(err);
  }
};
