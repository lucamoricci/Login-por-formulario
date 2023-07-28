const { Router } = require("express");
const ProductManager = require("../dao/mongo/productManager.js");

const router = Router();

router.get("/", async (req, res) => {
  const products = await ProductManager.getProducts();
  res.render("home", {
    products,
    style: "home.css",
  });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {
    style: "realTimeProducts.css",
  });
});


router.get("/products", async (req, res) => {
  const { page } = req.query;
  const products = await productModel.paginate(
    {},
    {
      limit: 4,
      lean: true,
      page: page ?? 1,
    }
  );
  res.render("products", { products });
});



module.exports = router;
