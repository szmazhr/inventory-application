const async = require('async');
const Category = require('../models/category');
const Item = require('../models/item');

// Display list of all Categories.
exports.category_list = (req, res, next) => {
  async.waterfall(
    [
      // getting all category
      (callback) => {
        Category.find({}, callback);
      },
      // Using categoryList and getting item count in each category
      (categoryList, callback) => {
        // to collect task to be execute parallel
        const tasks = {};

        // store each task to run parallel
        categoryList.forEach((category) => {
          tasks[category._id] = (cb) => {
            Item.countDocuments({ category }, cb);
          };
        });
        // run all task parallel
        async.parallel(tasks, (err, itemCount) => {
          // pass result including previous results to callback
          callback(null, categoryList, itemCount);
        });
      },
    ],
    // use the data and render view
    (err, categoryList, itemCount) => {
      if (err) {
        next(err);
      } else {
        res.render('category_list', {
          title: 'Category List',
          categoryList,
          itemCount,
        });
      }
    }
  );
};

// Display detail page for a specific Category.
exports.category_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Category Detail: ${req.params.id}`);
};

// Display Category create form on GET
exports.category_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Category create GET');
};

// Handle Category create on POST.
exports.category_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Category create POST');
};

// Display Category delete from on Get.
exports.category_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Category delete GET');
};

// Handle Category delete on POST.
exports.category_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Category delete POST');
};

// Display Category update form on GET.
exports.category_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Category update GET');
};

// Handle Category update on POST.
exports.category_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Category update POST');
};
