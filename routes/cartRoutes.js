const express = require('express');

const router = express.Router();

const cartController = require('../Controller/cartController')

router.get("/carts",cartController.getCartByEmail);
router.get("/orders",cartController.getAllOrders);
router.post("/carts",cartController.addTocart);
router.delete("/carts/:id",cartController.deleteCart);
router.put("/carts/:id",cartController.updateCart);
router.get("/carts/:id",cartController.getSingleCart);

module.exports = router;