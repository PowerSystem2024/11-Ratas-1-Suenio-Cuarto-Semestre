import {PRODUCTOS} from "../js/products.js";
const SHOP_CONTENT = document.getElementById("shopContent");

PRODUCTOS.forEach((producto) => {
  const productCard = document.createElement("div");
  productCard.classList.add("product-card");

  productCard.innerHTML = `
    <img src="${producto.image}" alt="${producto.name}">
    <h3>${producto.name}</h3>
    <p>Precio: $${producto.price}</p>
    <p>Cantidad: ${producto.quanty}</p>
  `;

  SHOP_CONTENT.appendChild(productCard);
});