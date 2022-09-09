const mongoose = require('mongoose');

const { Schema } = mongoose;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  description: {
    type: String,
    required: true,
    maxLength: 500,
  },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Boolean,
    required: true,
  },
  password: String,
});

// Virtual for Item's URL
// eslint-disable-next-line func-names
ItemSchema.virtual('url').get(function () {
  return `/inventory/item/${this._id}`;
});

module.exports = mongoose.model('Item', ItemSchema);
