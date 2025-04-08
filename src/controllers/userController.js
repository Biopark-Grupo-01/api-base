import User from "../models/userModel.js";

export const login = async (req, res, next) => {
  /*
    #swagger.tags = ['Login']
    #swagger.summary = 'Login user'
    #swagger.description = 'Login user'
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: "#/definitions/Login",
          },
        },
      },
    }
    #swagger.responses[200, 401]
  */
  req.user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  
  next();
}

export const getUser = async (req, res, next) => {
  /*
    #swagger.tags = ['User']
    #swagger.summary = 'Get user by id'
    #swagger.description = 'Get user by id'
    #swagger.responses[200]
  */
  try {
    const user = await User.findOne(req.params);

    res.hateoas_item(user);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  /*
    #swagger.tags = ['User']
    #swagger.summary = 'Get all users'
    #swagger.description = 'Get all users'
    #swagger.responses[200]
  */
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
  /*
    #swagger.tags = ['User']
    #swagger.summary = 'Create user'
    #swagger.description = 'Create user'
    #swagger.requestBody = {
      required: true,
      schema: {
        $ref: '#/components/schemas/User',
      },
    }
    #swagger.responses[201] 
  */
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
  /*
    #swagger.tags = ['User']
    #swagger.summary = 'Update user'
    #swagger.description = 'Update user'
    #swagger.requestBody = {
      required: true,
      schema: {
        $ref: '#/components/schemas/User',
      },
    }
    #swagger.responses[200]
  */
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
  /*
    #swagger.tags = ['User']
    #swagger.summary = 'Delete user'
    #swagger.description = 'Delete user'
    #swagger.responses[204]
  */
  try {
    await User.deleteOne(req.params);

    res.NO_CONTENT();
  } catch (err) {
    next(err);
  }
};
