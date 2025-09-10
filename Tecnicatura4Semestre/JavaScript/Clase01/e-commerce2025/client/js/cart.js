import { CART } from "../js/index.js";

const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");
const cartBtn = document.getElementById("cart-btn");

const closeModal = () => {
  modalContainer.style.display = "none";
  modalOverlay.style.display = "none";
};

const displayCart = () => {
  modalContainer.innerHTML = ""; // Limpiamos el carrito
  modalContainer.style.display = "block";
  modalOverlay.style.display = "block";

  // HEADER
  const modalHeader = document.createElement("div");

  const modalClose = document.createElement("div");
  modalClose.innerText = "❌";
  modalClose.className = "modal-close";
  modalClose.addEventListener("click", closeModal);

  const modalTitle = document.createElement("div");
  modalTitle.innerText = "Cart";
  modalTitle.className = "modal-title";

  modalHeader.append(modalClose, modalTitle);
  modalContainer.append(modalHeader);

  // BODY
  let total = 0;

  CART.forEach((product) => {
    const modalBody = document.createElement("div");
    modalBody.className = "modal-body";
    modalBody.innerHTML = `
      <div class="product">
        <img src="${product.image}" alt="${product.name}" class="product-img">
        <div class="product-info">
          <h4>${product.name}</h4>
        </div>
        <div class="quantity">
          <span class="quantity-btn-decrease" data-id="${product.id}">-</span>
          <span class="quantity-input">${product.quanty}</span>
          <span class="quantity-btn-increase" data-id="${product.id}">+</span>
        </div>
        <div class="price">$${product.price * product.quanty}</div>
        <div class="delete-product" data-id="${product.id}">❌</div>
      </div>
    `;
    modalContainer.append(modalBody);

    total += product.price * product.quanty;
  });

  // FOOTER
  const modalFooter = document.createElement("div");
  modalFooter.className = "modal-footer";
  modalFooter.innerHTML = `
    <h3>Total: $${total}</h3>
    <button id="checkout-btn">Finalizar compra</button>
  `;
  modalContainer.append(modalFooter);

  // EVENTOS: Aumentamos las cantidades de los productos
  const increaseBtns = modalContainer.querySelectorAll(".quantity-btn-increase");
  increaseBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const product = CART.find(p => p.id === id);
      if (product) {
        product.quanty += 1;
        displayCart(); 
      }
    });
  });

  // EVENTOS: Disminuimos cantidades
  const decreaseBtns = modalContainer.querySelectorAll(".quantity-btn-decrease");
  decreaseBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const product = CART.find(p => p.id === id);
      if (product && product.quanty > 1) {
        product.quanty -= 1;
      } else if (product && product.quanty === 1) {
        const confirmDelete = confirm(`¿Querés eliminar "${product.name}" del carrito?`);
        if (confirmDelete) {
          CART.splice(CART.indexOf(product), 1);
        }
      }
    displayCart();
  });
});


  // EVENTOS: Eliminar el producto
  const deleteBtns = modalContainer.querySelectorAll(".delete-product");
  deleteBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const index = CART.findIndex(p => p.id === id);
      if (index !== -1) {
        CART.splice(index, 1);
        displayCart();
      }
    });
  });

  // EVENTO: Finalizar compra
  const checkoutBtn = document.getElementById("checkout-btn");
  checkoutBtn.addEventListener("click", () => {
    alert("¡Gracias por tu compra!");
    CART.length = 0;
    displayCart();
  });
};

cartBtn.addEventListener("click", displayCart);
modalOverlay.addEventListener("click", closeModal);
