import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: 'string', required: true },
  description: { type: 'string', required: true },
  stock: { type: 'number', required: true },
  price: { type: 'number', required: true },
}, {
  versionKey: false,
  timestamps: true,
});

const Product = mongoose.model("Product", productSchema);

export default Product;