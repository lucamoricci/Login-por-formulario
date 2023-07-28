const Product = require("./models/productModel");

class ProductManager {
  constructor() {
    this.productModel = Product;
  }

  async getProducts() {
    try {
      const products = await this.productModel.find();
      return products;
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      return [];
    }
  }

  async getProductById(id) {
    try {
      const product = await this.productModel.findById(id);
      if (product) {
        return product;
      } else {
        console.error("Producto no encontrado");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      return null;
    }
  }

  async addProduct({
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnails = [],
  }) {
    if (!title || !description || !code || !price || !stock || !category) {
      console.error("Faltan campos obligatorios");
      return null;
    }

    thumbnails.push("https://picsum.photos/536/354?image=");
    thumbnails.push("https://picsum.photos/536/354?image=");
    thumbnails.push("https://picsum.photos/536/354?image=");

    try {
      const newProduct = new this.productModel({
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      });

      const savedProduct = await newProduct.save();
      return savedProduct;
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      return null;
    }
  }

  async updateProduct(id, object) {
    try {
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        id,
        object,
        { new: true }
      );
      if (updatedProduct) {
        return updatedProduct;
      } else {
        console.error("Producto no encontrado");
        return null;
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      return null;
    }
  }

  async deleteProduct(id) {
    try {
      const deletedProduct = await this.productModel.findByIdAndDelete(id);
      if (deletedProduct) {
        return deletedProduct;
      } else {
        console.error("Producto no encontrado");
        return null;
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      return null;
    }
  }
}

module.exports = ProductManager;
