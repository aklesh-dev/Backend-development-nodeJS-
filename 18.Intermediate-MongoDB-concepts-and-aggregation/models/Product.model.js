import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  inStock: Boolean,
  tags: [String],

}, {timestamps: true});

const Product = mongoose.model("Product", productSchema);
export default Product;