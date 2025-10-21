const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({
  origin: "http://localhost:8080",   // your frontend url
  credentials: true,                  // allow cookies/tokens
  exposedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// const tenantRouter = require('./routes/tenantRoute');
// app.use('/api', tenantRouter);

// const adminRouter = require('./routes/adminRoute');
// // const { pool } = require('./database/connection');
// app.use('/api', adminRouter);

const adminDashboardRoutes = require('./routes/adminDashboardRoutes');
app.use('/admin/dashboard', adminDashboardRoutes);

const usersRouter = require('./routes/usersRoute');
app.use('/', usersRouter);

const lockerRouter = require('./routes/lockerRoute');
app.use('/locker', lockerRouter);

const profilePicture = require('./routes/profilePicture');
app.use('/', profilePicture);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;