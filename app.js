require('dotenv').config();
require('express-async-errors');

// extra security packages
// const helmet = require('helmet');
const cors = require('cors');
// const xss = require('xss-clean');
// const rateLimiter = require('express-rate-limit');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
// routers
const authRouter = require('./routes/user-auth');
const adminAuthRouter = require('./routes/admin-auth');
const adminRouter = require('./routes/admin');
const reviewsRouter = require('./routes/reviews');
const rewardsRouter = require('./routes/rewards');
const depositRouter = require('./routes/deposit')
const validationRouter = require('./routes/ticketPrice');
const movieRouter = require('./routes/movie')
const recordsRouter = require('./routes/records');
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// app.set('trust proxy', 1);
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//   })
// );
app.use(express.json());
// app.use(helmet());
app.use(cors());
// app.use(xss());

app.get('/', (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user-movie-review', reviewsRouter);
app.use('/api/v1/user', rewardsRouter);
app.use('/api/v1/movie/',movieRouter)
app.use('/api/v1/user/',depositRouter)
app.use('/api/v1/user/',recordsRouter)
app.use('/api/v1/auth/admin', adminAuthRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/user/',recordsRouter)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5002;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`User backend server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
