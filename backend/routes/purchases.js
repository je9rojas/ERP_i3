const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');

// Ruta para guardar una compra
router.post('/', (req, res, next) => {
  console.log('Datos recibidos en la solicitud:', req.body);
  next();
}, purchaseController.addPurchase);

module.exports = router;
