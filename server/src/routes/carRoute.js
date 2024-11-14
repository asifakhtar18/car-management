const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const upload = require('../utils/multer');
const carController = require('../controllers/carContoller');

router.post('/', auth, upload.array('images', 10), carController.createCar);
router.get('/', auth, carController.getCars);
router.get('/:id', auth, carController.getCar);
router.patch('/:id', auth, upload.array('images', 10), carController.updateCar);
router.delete('/:id', auth, carController.deleteCar);

module.exports = router;