const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('UNHANDLED EXPECTION. Shutting down.....');
  console.log(err.name, err.message);
  process.exit(1);
});

// console.log(app.get('env'));
// console.log(process.env);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB conncection successful');
  });

const port = 8000 || process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}.....`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION. Shutting down.....');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
