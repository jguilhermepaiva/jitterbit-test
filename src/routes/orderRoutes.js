const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Define a rota exata pedida no PDF
router.post('/', orderController.create); 

module.exports = router;