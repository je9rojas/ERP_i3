const express = require('express');
const { getPurchases, createPurchase } = require('../controllers/purchaseController');
const router = express.Router();

router.get('/', getPurchases); // Obtener todas las compras
router.post('/', createPurchase); // Crear una nueva compra

module.exports = router;


/*

const express = require("express");
const router = express.Router();
const Purchase = require("../models/Purchase");

router.post("/", async (req, res) => {
    const { item, quantity, price } = req.body;
    try {
        const purchase = new Purchase({ item, quantity, price });
        await purchase.save();
        res.status(201).json(purchase);
    } catch (error) {
        res.status(500).json({ error: "Error al guardar la compra" });
    }
});

router.get("/", async (req, res) => {
    try {
        const purchases = await Purchase.find();
        res.json(purchases);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las compras" });
    }
});

module.exports = router;

*/
