const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  parent: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'Category',
  },
},
  {
    versionKey: false,
  });

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;