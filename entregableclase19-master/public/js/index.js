const socket = io()

const products = document.getElementById("product-container");

socket.on("products", (data) => {
  products.innerHTML = data.reduce((acc, product) => {
    return acc + containerProducts(product)
  }, "")
});

const submit = document.getElementById("btn-submit");
let title = document.getElementById("title");
let description = document.getElementById("description");
let category = document.getElementById("category");
let code = document.getElementById("code");
let price = document.getElementById("price");
let stock = document.getElementById("stock");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(document.getElementById("title").value)
  socket.emit("new-product", { 
    title: title.value,
    description: description.value, 
    category: category.value, 
    code: code.value, 
    price: parseFloat(price.value), 
    stock: parseInt(stock.value)
  });
  clearFields()
})

function containerProducts(product) {
  return (`
    <div class="product" id="product-${product.id}">
      <h2 class="product-title">${product.title}</h2>
      <p class="product-description">Descripción: ${product.description}</p>
      <p class="product-category">Categoría: ${product.category}</p>
      <p class="product-code">Código: ${product.code}</p>
      <p class="product-price">Precio: ${product.price}</p>
      <p class="product-stock">Stock: ${product.stock}</p>
      ${
        product.status ? "<p class='availability'>Estado: <span class='available'>Disponible</span></p>"
        : "<p class='availability'>Estado: <span class='unavailable'>No disponible</span></p>"
      }
    </div>
  `)
};

function clearFields() {
  title.value = ""
  description.value = ""
  category.value = ""
  code.value = ""
  price.value = "0"
  stock.value = "0"
};

function randomNum() {
  return Math.floor(Math.random() * 100)
}