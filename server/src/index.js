const express = require('express');
const cors = require('cors');

const userRoute = require('./routes/userRoute');
const carRoute = require('./routes/carRoute');
const connectDb = require('./utils/connectDb');
const { PORT } = require('./configs/config');

const app = express();
app.use(express.json());
app.use(cors());


app.use('/users', userRoute);
app.use('/car', carRoute);



app.listen(PORT, async () => {
    try {
        await connectDb();
        console.log('Server started on port : ', PORT);
    } catch (error) {
        console.error('Error in server:', error);
    }
});