const fs = require("fs");
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');


const userRoute = require('./routes/userRoute');
const carRoute = require('./routes/carRoute');
const connectDb = require('./utils/connectDb');

const { PORT } = require('./configs/config');

const app = express();
app.use(express.json());


const userSwaggerDocument = yaml.load(fs.readFileSync('./src/docs/swagger-user.yaml', 'utf8'));
const carSwaggerDocument = yaml.load(fs.readFileSync('./src/docs/swagger-car.yaml', 'utf8'));


const corsOptions = {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions))


app.use('/api-docs/users', swaggerUi.serve, swaggerUi.setup(userSwaggerDocument));

app.use('/api-docs/cars', swaggerUi.serve, swaggerUi.setup(carSwaggerDocument));


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