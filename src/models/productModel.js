import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
}, {
  versionKey: false,
  timestamps: true,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
