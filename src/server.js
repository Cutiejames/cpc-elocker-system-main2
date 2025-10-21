// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
require('dotenv').config();
const app = require('./app');

// const app = express();
const port = process.env.PORT || 3001;

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// const userRouter = require('./routes/userRoute');
// app.use('/user', userRouter);

// const adminRouter = require('./routes/adminRoute');
// app.use('/admin', adminRouter);

// const port = 3001;

const cron = require('node-cron');
const expireReservations = require('./jobs/expireReservations');

// run every minute
cron.schedule('* * * * *', expireReservations);


app.listen(port, () => {
    console.log(`Server is running on port:`, port);
});