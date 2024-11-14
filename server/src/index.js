const express = require('express');
const cors = require('cors');

const userRoute = require('./routes/userRoute');
const carRoute = require('./routes/carRoute');
const connectDb = require('./utils/connectDb');
const { PORT } = require('./configs/config');

const app = express();
app.use(express.json());

// origin: ['https://car-management-beta.vercel.app', 'http://localhost:5173', 'https://car-management-asifakhtar18s-projects.vercel.app', 'https://car-management-git-main-asifakhtar18s-projects.vercel.app'],

const corsOptions = {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/users', userRoute);
app.use('/car', carRoute);

app.get("/", (req, res) => {
    res.send("Hello world")
})



app.listen(PORT, async () => {
    try {
        await connectDb();
        console.log('Server started on port : ', PORT);
    } catch (error) {
        console.error('Error in server:', error);
    }
});