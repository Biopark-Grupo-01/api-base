import User from "../models/userModel.js";

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
    const { _page, _size, _order, ...filter} = req.query;
    const page = parseInt(_page) || 1;
    const size = parseInt(_size) || 10;

    const offset = (page - 1) * size;

    const users = await User
      .find(filter)
      .skip(offset)
      .limit(size)
      .sort(_order);

    const totalData = await User.countDocuments();
    const totalPages = Math.ceil(totalData / size);

    res.hateoas_list(users, totalPages);
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
