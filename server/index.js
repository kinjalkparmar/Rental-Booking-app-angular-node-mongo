const express = require('express');
const config = require('./config/dev'); 
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Rental = require('./models/rental');
const FakeDb = require('./fake-db');

const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings');



const app = express();
app.use(bodyParser.json())
mongoose.connect(config.DB_URI).then(()=>{
    const fakeDb = new FakeDb();
  //  fakeDb.seedDb();
})

const PORT= process.env.PORT || 3001;
app.listen(PORT, function(){
    console.log("I am running");
});

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/bookings', bookingRoutes)