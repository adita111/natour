const express = require('express');

const app = express();
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routs/tourRoutes');
const userRouter = require('./routs/userRoutes');
//////Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(
  //   `Cant find ${req.originalUrl} on this server`,
  // );
  // err.statusCode = 404;
  // err.status = 'fail';
  next(
    new AppError(`Cant find ${req.originalUrl} on this server`, 404),
  );
});

app.use(globalErrorHandler);

module.exports = app;
