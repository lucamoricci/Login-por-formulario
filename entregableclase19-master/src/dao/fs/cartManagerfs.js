const fs = require('fs')
const path = require('path')

class CartManager {
  constructor(path) {
    this.path = path
  }

  async #save(object) {
    try {
      const objectToStr = JSON.stringify(object, null, 2);
      await fs.promises.writeFile(this.path, objectToStr);
    } catch (ErrorSave) {
      console.error({ ErrorSave });
    }
  };

  async getAllCarts() {
    try {
      const readFile = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(readFile);
    } catch (error) {
      console.log("File not exist. Building...")
      this.#save([])
    
      return []
    }
  };

  async getCart(id) {
    try {
      const carts = await this.getAllCarts();
      const cart = carts.find(cart => cart?.id === id);
      if(cart) return cart;
      console.error("Carrito no encontrado");
      return null
    } catch (ErrorGetCart) {
      console.error({ ErrorGetCart });
    }
  };

  async addCart() {
    try {
      const carts = await this.getAllCarts();
      const newCart = {
        id: carts.length ? carts[carts.length - 1].id + 1 : 1,
        products: []
      }
      carts.push(newCart);
      this.#save(carts)
      return newCart
    } catch (ErrorAddCart) {
      console.error({ ErrorAddCart })
    }
  };

  async addProductToCart(id, idProduct) {
    try {
      const carts = await this.getAllCarts();
      const cart = carts.find(cart => cart?.id === id);
      if(!cart) {
        console.error("Carrito no encontrado");
        return null
      };
      let productFind = cart.products.find(elem => elem?.product === idProduct);
      if(!productFind) {
        productFind = { product: idProduct, quantity: 0 }
        cart.products.push(productFind);
        console.log("Producto agregado al carrito")
      }
      productFind.quantity++
      await this.#save(carts)
      return productFind
    } catch (ErrorAddProductToCart) {
      console.error({ ErrorAddProductToCart })
    }
  };

}

const rutaCart = path.join(__dirname, '../../db/carrito.json')
module.exports = new CartManager(rutaCart)