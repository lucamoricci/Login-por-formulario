const { Router } = require("express");
const ProductManager = require("../dao/mongo/productManager");
const router = Router();

/////////////////////////////GET MODIFICADO

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 4;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort;
    const query = req.query.query;

    const filter = {};
    if (query) {
      filter.$or = [
        { category: { $regex: query, $options: "i" } },
        { status: { $regex: query, $options: "i" } },
      ];
    }

    const totalProducts = await ProductManager.getProductCount(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    const options = {
      page: page,
      limit: limit,
      sort: sort,
    };

    const result = await ProductManager.getProducts(filter, options);

    const hasNextPage = result.hasNextPage;
    const hasPrevPage = result.hasPrevPage;
    const nextPage = result.nextPage;
    const prevPage = result.prevPage;

    const formattedResult = {
      status: "success",
      payload: result.docs,
      totalPages: totalPages,
      prevPage: prevPage,
      nextPage: nextPage,
      page: page,
      hasPrevPage: hasPrevPage,
      hasNextPage: hasNextPage,
      prevLink: hasPrevPage
        ? `/api/products?page=${prevPage}&limit=${limit}`
        : null,
      nextLink: hasNextPage
        ? `/api/products?page=${nextPage}&limit=${limit}`
        : null,
    };

    res.json(formattedResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

///////////////////////////////////

router.get("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const productFind = await ProductManager.getProductById(id);
    if (!productFind) {
      return res
        .status(404)
        .send({ status: "failed", error: `Product not found` });
    }
    res.json(productFind);
  } catch (error) {
    console.error(error);
  }
});

router.post("/", async (req, res) => {
  try {
    let { title, description, code, price, stock, category } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
      return res
        .status(400)
        .send({ status: "failed", error: `Missing fields` });
    }
    const newProduct = {
      title,
      description,
      code,
      price,
      stock,
      category,
      status: true,
      thumbnails: [],
    };
    const addProduct = await ProductManager.addProduct(newProduct);
    res.json(addProduct);
  } catch (error) {
    console.error(error);
  }
});

router.put("/:pid", async (req, res) => {
  const fields = [
    "title",
    "description",
    "code",
    "price",
    "status",
    "stock",
    "category",
  ];
  try {
    const idProduct = parseInt(req.params.pid);
    let keys = Object.keys(req.body);
    const hasValidFields = keys.every((key) => fields.includes(key));
    if (!hasValidFields) {
      return res
        .status(400)
        .send({ status: "failed", error: `Invalid fields` });
    }
    const productUpdated = await ProductManager.updateProduct(
      idProduct,
      req.body
    );
    if (!productUpdated) {
      return res.json({ status: "failed", error: `Product not found` });
    }
    res.json(productUpdated);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const idProduct = parseInt(req.params.pid);
    const productDeleted = await ProductManager.deleteProduct(idProduct);
    if (!productDeleted) {
      return res
        .status(404)
        .json({ status: "failed", payload: "Product not found" });
    }
    res.status(200).json({ status: "success", payload: productDeleted });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
