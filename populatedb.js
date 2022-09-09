#! /usr/bin/env node
/* eslint-disable no-console */

console.log(
  'This script populates some test items, and categories to database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/inventory?retryWrites=true'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require('async');
const mongoose = require('mongoose');
const Item = require('./models/item');
const Category = require('./models/category');

const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const items = [];
const categories = [];

function categoryCreate(name, password, cb) {
  const categoryDetail = {
    name,
  };

  if (password) categoryDetail.password = password;

  const category = new Category(categoryDetail);

  category.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Category: ${category}`);
    categories.push(category);
    cb(null, category);
  });
}

function itemCreate(name, description, category, price, stock, password, cb) {
  const itemDetail = {
    name,
    description,
    price,
    stock,
  };

  if (password) itemDetail.password = password;
  if (category) itemDetail.category = category;

  const item = new Item(itemDetail);

  item.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Item: ${item}`);
    items.push(item);
    cb(null, item);
  });
}

function createItems(cb) {
  async.parallel(
    [
      function (callback) {
        // console.log(categories);
        itemCreate(
          'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
          'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
          [categories[2]],
          109.95,
          true,
          false,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Mens Casual Premium Slim Fit T-Shirts',
          'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
          [categories[2]],
          22.3,
          true,
          false,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Mens Cotton Jacket',
          'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
          [categories[2], categories[1]],
          55.99,
          true,
          false,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Mens Casual Slim Fit',
          'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.',
          [categories[2]],
          15.99,
          true,
          false,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
          "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
          [],
          695,
          true,
          false,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Solid Gold Petite Micropave ',
          'Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.',
          [categories[1]],
          168,
          false,
          false,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'White Gold Plated Princess',
          "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
          [categories[1]],
          9.99,
          true,
          false,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Pierced Owl Rose Gold Plated Stainless Steel Double',
          'Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel',
          [categories[1]],
          10.99,
          true,
          false,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'WD 2TB Elements Portable External Hard Drive - USB 3.0 ',
          'USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system',
          [categories[0]],
          64,
          true,
          false,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',
          'Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)',
          [categories[0]],
          109,
          true,
          false,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5',
          '3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.',
          [categories[0]],
          109,
          true,
          false,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive',
          "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
          [categories[0]],
          114,
          true,
          false,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin',
          '21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz',
          [categories[0]],
          599,
          true,
          false,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) - Super Ultrawide Screen QLED ',
          '49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag',
          [categories[0]],
          999.99,
          true,
          false,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
          'Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure.',
          [categories[3]],
          56.99,
          true,
          false,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
          '100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON',
          [categories[3]],
          29.95,
          true,
          false,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Rain Jacket Women Windbreaker Striped Climbing Raincoats',
          "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
          [categories[3]],
          39.99,
          true,
          false,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "MBJ Women's Solid Short Sleeve Boat Neck V ",
          '95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem',
          [categories[3]],
          9.85,
          true,
          false,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Opna Women's Short Sleeve Moisture",
          '100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort',
          [categories[3]],
          7.95,
          true,
          false,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'DANVOUY Womens T Shirt Casual Cotton Short',
          '95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.',
          [categories[3]],
          12.99,
          true,
          false,
          callback
        );
      },
    ],
    cb
  );
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate('electronics', false, callback);
      },
      function (callback) {
        categoryCreate('jewelery', false, callback);
      },
      function (callback) {
        categoryCreate(`men's clothing`, false, callback);
      },
      function (callback) {
        categoryCreate(`women's clothing`, false, callback);
      },
    ],
    cb
  );
}

async.series(
  [createCategories, createItems],
  // Optional callback
  (err) => {
    if (err) {
      console.log(`FINAL ERR: ${err}`);
    } else {
      console.log(`Items: ${items}`);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
