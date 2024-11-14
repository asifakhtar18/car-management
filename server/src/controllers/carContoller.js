const Car = require('../models/Car');
const cloudinary = require('../utils/cloudinary');

exports.createCar = async (req, res) => {
    try {
        const carData = {
            ...req.body,
            owner: req.user._id
        };

        const imageUrls = [];
        if (req.files) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path);
                imageUrls.push({
                    url: result.secure_url,
                    public_id: result.public_id
                });
            }
        }

        carData.images = imageUrls;
        const car = new Car(carData);
        await car.save();
        res.status(201).send(car);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getCars = async (req, res) => {
    try {
        const search = req.query.search;
        let query = { owner: req.user._id };

        if (search) {
            query.$text = { $search: search };
        }

        const cars = await Car.find(query);
        res.send(cars);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getCar = async (req, res) => {
    try {
        const car = await Car.findOne({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!car) {
            return res.status(404).send();
        }
        res.send(car);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateCar = async (req, res) => {
    const { id } = req.params
    try {
        const car = await Car.findOne({
            _id: id,
            owner: req.user._id
        });

        if (!car) {
            return res.status(404).send();
        }



        const { title, description, car_type, company, dealer } = req.body

        car.title = title;
        car.description = description;
        car.car_type = car_type;
        car.company = company;
        car.dealer = dealer;

        const updateCar = await car.save()
        res.status(200).json(updateCar)
    } catch (error) {
        console.error(error)
        res.status(400).send(error);
    }
};

exports.deleteCar = async (req, res) => {

    try {
        const { id } = req.params
        const car = await Car.findOne({
            _id: id,
            owner: req.user._id
        });

        if (!car) {
            return res.status(404).send();
        }
        for (const image of car.images) {
            await cloudinary.uploader.destroy(image.public_id);
        }
        await Car.findByIdAndDelete(id)
        res.send(car);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
};