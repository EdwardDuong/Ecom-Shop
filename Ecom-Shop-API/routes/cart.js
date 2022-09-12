var express = require("express");
var router = express.Router();
const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
var router = express.Router();

//CREATE
router.post("/", verifyToken, async (req, res, next) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

/*UPDATE*/
router.put("/:id", verifyTokenAndAuthorization, async (req, res, next) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res, next) => {
  try {
    const { cart, ...others } = await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json(`Cart ${cart} have been deleted...`);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET PRODUCTS IN CART
router.get(
  "/find/:userId",
  verifyTokenAndAuthorization,
  async (req, res, next) => {
    try {
      const cart = await Cart.findById(req.params.userId);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

//GET ALL CARTS
router.get("/", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
