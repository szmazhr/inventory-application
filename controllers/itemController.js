const async = require('async');
const Item = require('../models/item');
const Category = require('../models/category');

exports.index = (req, res) => {
  async.parallel(
    {
      item_count(callback) {
        Item.countDocuments({}, callback);
      },
      item_available_count(callback) {
        Item.countDocuments({ stock: true }, callback);
      },
      category_count(callback) {
        Category.countDocuments({}, callback);
      },
    },
    (err, results) => {
      res.render('index', {
        title: 'Inventory Home',
        error: err,
        data: results,
      });
    }
  );
};

// Display list of all Items.
exports.item_list = (req, res, next) => {
  Item.find({})
    .sort({ name: 1 })
    .populate('category')
    .exec((err, itemList) => {
      if (err) {
        next(err);
      } else {
        res.render('item_list', { title: 'Item List', itemList });
      }
    });
};

// Display detail page for a specific Item.
exports.item_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Item Detail: ${req.params.id}`);
};

// Display Item create form on GET
exports.item_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Item create GET');
};

// Handle Item create on POST.
exports.item_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Item create POST');
};

// Display Item delete from on Get.
exports.item_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Item delete GET');
};

// Handle Item delete on POST.
exports.item_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Item delete POST');
};

// Display Item update form on GET.
exports.item_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Item update GET');
};

// Handle Item update on POST.
exports.item_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Item update POST');
};
