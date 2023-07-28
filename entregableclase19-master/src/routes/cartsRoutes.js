const { Router } = require("express");
const CartManager = require("../dao/mongo/cartManager");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allCarts = await CartManager.getAllCarts();
    res.json(allCarts);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newCart = await CartManager.addCart();
    res.json(newCart);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const idCart = parseInt(req.params.cid);
    const cart = await CartManager.getCart(idCart);
    if (!cart) {
      return res
        .status(404)
        .json({ status: "failed", error: "Cart not exist" });
    }
    res.json(cart);
  } catch (error) {
    console.error(error);
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const idCart = parseInt(req.params.cid);
    const idProduct = parseInt(req.params.pid);
    const addProductToCart = await CartManager.addProductToCart(
      idCart,
      idProduct
    );
    res.json(addProductToCart);
  } catch (error) {
    console.error(error);
  }
});

router.put("/:cid", async (req, res) => {
  try {
    const idCart = parseInt(req.params.cid);
    const products = req.body.products;
    if (!Array.isArray(products)) {
      return res
        .status(400)
        .json({ status: "failed", error: "Invalid products data" });
    }
    const updatedCart = await CartManager.updateCart(idCart, products);
    res.json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const idCart = parseInt(req.params.cid);
    const idProduct = parseInt(req.params.pid);
    const quantity = parseInt(req.body.quantity);
    if (isNaN(quantity)) {
      return res
        .status(400)
        .json({ status: "failed", error: "Invalid quantity value" });
    }
    const updatedCart = await CartManager.updateProductQuantity(
      idCart,
      idProduct,
      quantity
    );
    res.json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const idCart = parseInt(req.params.cid);
    const deletedCart = await CartManager.deleteCart(idCart);
    if (!deletedCart) {
      return res
        .status(404)
        .json({ status: "failed", payload: "Cart does not exist" });
    }
    res.json({ status: "success", payload: deletedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const idCart = parseInt(req.params.cid);
    const idProduct = parseInt(req.params.pid);
    const updatedCart = await CartManager.deleteProductFromCart(
      idCart,
      idProduct
    );
    res.json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

module.exports = router;
