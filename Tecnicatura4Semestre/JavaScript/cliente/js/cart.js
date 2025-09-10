const modalContainer = document.getElementById("modal-container");
const modalOverlay   = document.getElementById("modal-overlay");

const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");


const displayCartCounter = () => {
  const cartLenght = cart.reduce((acc, item) => acc + item.quantity, 0);
  if(cartLenght > 0){
    cartCounter.style.display = "block";
    cartCounter.innerText = cartLenght;
  }else{
    cartCounter.style.display = "none";
  }
};

const closeCart = () => {
  modalContainer.style.display = "none";
  modalOverlay.style.display   = "none";
  modalContainer.innerHTML = "";
};

const renderCart = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "block";
  modalOverlay.style.display   = "block";

  // Header
  const modalHeader = document.createElement("div");

  const modalClose = document.createElement("div");
  modalClose.innerText = "❌";
  modalClose.className = "modal-close";
  modalClose.addEventListener("click", closeCart);

  const modalTitle = document.createElement("div");
  modalTitle.innerText = "Cart";
  modalTitle.className = "modal-title";

  modalHeader.append(modalClose, modalTitle);
  modalContainer.append(modalHeader);

  // Body
  if (cart.length === 0) {
    const empty = document.createElement("p");
    empty.style.padding = "10px";
    empty.textContent = "El carrito está vacío.";
    modalContainer.append(empty);
  } else {
    cart.forEach((product, index) => {
      const modalBody = document.createElement("div");
      modalBody.className = "modal-body";
      modalBody.innerHTML = `
        <div class="product">
          <img class="product-img" src="${product.img}" alt="${product.productName}" />
          <div class="product-info">
            <h4>${product.productName}</h4>
          </div>
          <div class="quantity">
            <span class="quantity-btn-decrease">-</span>
            <span class="quantity-input">${product.quantity}</span>
            <span class="quantity-btn-increase">+</span>
          </div>
          <div class="price">${product.price * product.quantity} $</div>
          <div class="delete-product">❌</div>
        </div>
      `;
    
      // Eventos +, -, borrar
      modalBody.querySelector(".quantity-btn-decrease").addEventListener("click", () => {
        product.quantity -= 1;
        if (product.quantity <= 0) cart.splice(index, 1);
        renderCart();
      });

      modalBody.querySelector(".quantity-btn-increase").addEventListener("click", () => {
        product.quantity += 1;
        renderCart();
      });

      modalBody.querySelector(".delete-product").addEventListener("click", () => {
        cart.splice(index, 1);
        renderCart();
      });

      modalContainer.append(modalBody);
    });
  }
    // Footer con total
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const footer = document.createElement("div");
    footer.className = "modal-footer";
    footer.innerHTML = `
      <strong>Total: ${total} $</strong>
      <button class="btn-primary" id="checkout-btn">Go to checkout</button>
      <div id="button-checkout"></div>
  `;

    modalContainer.append(footer);
    //mp;
    const mercadopago = new MercadoPago("TEST-9eee4002-2642-4c0b-a805-1facc4116761",{
      locale: "es-AR",//the most common are: "pt-BR", "es-AR" and "es-US"
    });

    const checkoutButton = footer.querySelector("#checkout-btn");

    checkoutButton.addEventListener("click", function (){
      checkoutButton.remove();
      
      const orderData = {
        quantity: 1,
        description: "compra de ecommerce",
        price: total,
      };

      fetch("http://localhost:8080/create_preference",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
        .then(function(response){
          return response.json();
        })
        .then(function (preference){
          creareCheckoutButton(preference.id);
        })
        .catch(function (){
          alert("Unexpected error")
        });
  });
  function creareCheckoutButton(preferenceId){
    //initialize the checkout
    const bricksBuilder = mercadopago.bricks();

    const renderComponent = async (bricksBuilder) =>{
      //if (window.checkoutButton) checkoutButton.unmount();

      await bricksBuilder.create(
        "wallet",
        "button-checkout", // class/id where the payment burron will be displayed
        {
          initialization: {
            preferenceId: preferenceId
          },
          callbacks: {
            onError: (error) => console.error(error),
            onReady: () => {},
          },
        }
      );
    };
    window.checkoutButton = renderComponent(bricksBuilder);
  }

};

// Abrir/cerrar
cartBtn.addEventListener("click", renderCart);
modalOverlay.addEventListener("click", closeCart);
