import Product from "../models/productModel.js";

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne(req.params);

    res.hateoas_item(product);
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const { _page, _size, _order, ...filter} = req.query;
    const page = parseInt(_page) || 1;
    const size = parseInt(_size) || 10;

    const offset = (page - 1) * size;

    const products = await Product
      .find(filter)
      .skip(offset)
      .limit(size)
      .sort(_order);

    const totalData = await Product.countDocuments();
    const totalPages = Math.ceil(totalData / size);

    res.hateoas_list(products, totalPages);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, quantity, price } = req.body;

    await new Product({
      name,
      description,
      quantity,
      price,
    }).save();

    res.CREATED();
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { name, description, quantity, price } = req.body;

    const product = await Product.findOneAndUpdate(req.params,{
      name,
      description,
      quantity,
      price,
    }, {
      new: true,
    });

    res.hateoas_item(product);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await Product.deleteOne(req.params);

    res.NO_CONTENT();
  } catch (err) {
    next(err);
  }
};
