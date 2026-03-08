const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

// Define a rota exata pedida no PDF
router.post('/', OrderController.create); 

router.get('/list', OrderController.list);

router.get('/:id', OrderController.getById);

router.put('/:id', OrderController.update);

router.delete('/:id', OrderController.delete);

module.exports = router;