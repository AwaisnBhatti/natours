const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;

  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/"([^"]*)"/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;

  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid Token! Please log in again', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has been expired! Please log in again', 401);

const sendErrorDev = (req, res, err) => {
  // For API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }
  // For rendered website
  console.error('Error', err);

  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong',
    msg: err.message,
  });
};

const sendErrorProd = (req, res, err) => {
  // For API
  // Oprational, trusted error:send message to client
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });

      // Programming or other unknown error, don't leak error details
    }
    // 1) Log error
    console.error('Error', err);

    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
  // For rendered website
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      msg: err.message,
    });
  }

  // 1) Log error
  console.error('Error', err);

  // 2) Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong',
    msg: 'Please try again later.',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || '500';
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(req, res, err);
  } else if (process.env.NODE_ENV === 'production') {
    let error = err;
    // error.message = err.message;
    if (err.name === 'CastError') error = handleCastErrorDB(err);

    if (err.code === 11000) error = handleDuplicateFieldsDB(err);

    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);

    if (err.name === 'JsonWebTokenError') error = handleJWTError();

    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(req, res, error);
  }
};
