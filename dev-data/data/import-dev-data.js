const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../../config.env' });
const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => {
//     console.log('DB connection successful');
//   });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`));

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);

    console.log('Data imported successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    console.log('Data deleted successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// console.log(process.argv);

// if (process.argv[2] === '--import') {
//   importData();
// } else if (process.argv[2] === '--delete') {
//   deleteData();
// }

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    maxPoolSize: 50,
    minPoolSize: 10,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 5000,
    family: 4,
  })
  .then(() => {
    console.log('DB connection successful');

    if (process.argv[2] === '--import') {
      importData();
    } else if (process.argv[2] === '--delete') {
      deleteData();
    }
  })
  .catch((err) => {
    console.error('Connection failed:', err.message);
    process.exit(1);
  });
