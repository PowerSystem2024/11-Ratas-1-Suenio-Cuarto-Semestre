const shopContent = document.getElementById("shopContent");
const cart = [];

productos.forEach((product) => {
    const content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.productName}</h3>
        <p class="price">${product.price} $</p>
    `;
    shopContent.append(content);

    const buyButton = document.createElement("button");
    buyButton.innerText = "Comprar";

    document.addEventListener("DOMContentLoaded", () => {
      cartBtn.addEventListener("click", renderCart);
      modalOverlay.addEventListener("click", closeCart);
    });


    buyButton.addEventListener("click", () => {
      const found = cart.find((item) => item.id === product.id);
      if (found) {
        found.quantity += 1;
      } else {
        cart.push({
          id: product.id,
          productName: product.productName,
          price: product.price,
          quantity: 1,             // inicia en 1 al agregar
          img: product.img,
        });
      }
      displayCartCounter();
      // console.log(cart);
    });
    
    content.append(buyButton);
    shopContent.append(content);
});
