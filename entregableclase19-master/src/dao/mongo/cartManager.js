const Cart = require("./models/cartModel");

class CartManager {
  async getAllCarts() {
    try {
      return await Cart.find().populate("products.productId");
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }

  async getCart(id) {
    try {
      return await Cart.findById(id).populate("products.productId");
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }

  async addCart() {
    try {
      const newCart = new Cart({
        products: [],
      });
      return await newCart.save();
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      const updatedProducts = cart.products.filter(
        (product) => product.productId.toString() !== productId
      );
      cart.products = updatedProducts;
      await cart.save();
      return await this.getCart(cartId);
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }

  async updateCart(cartId, products) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      cart.products = products;
      await cart.save();
      return await this.getCart(cartId);
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      const productIndex = cart.products.findIndex(
        (product) => product.productId.toString() === productId
      );
      if (productIndex === -1) {
        throw new Error("Product not found in cart");
      }
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      return await this.getCart(cartId);
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }

  async deleteCart(cartId) {
    try {
      return await Cart.findByIdAndDelete(cartId);
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }
}

module.exports = CartManager;
