const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  code: {
    type: String,
    minlength: 10,
    maxlength: 10,
    unique: true,
    require: true,
  },
  title: {
    type: String,
    maxlength: 60,
    require: true,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  price: {
    type: Number,
    default: 0,
    required: true,
  },
});

const Item = mongoose.model("Item", schema);

module.exports = Item;
