const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoute');
const errorMiddleware = require('./middlewares/error');
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({extended: true, parameterLimit: 2000, limit: '5000kb'}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());

app.use(fileUpload());
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
        exposedHeaders: ['X-Total-Count'],
      })
  );

app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, Delete");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  })
  
// Routes
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/payment', paymentRoutes);


// middleware for handling error
app.use(errorMiddleware)

module.exports = app;