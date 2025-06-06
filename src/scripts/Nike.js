// ✅ Correct import paths (omit `/public`)
import { latestShoes } from "../data/Latest.js";
import { carts, showAddToCartModal, updateCartQuantity } from "../data/cart.js";

// ✅ Generate shoe cards
let latestShoesHTML = '';
latestShoes.forEach((shoes) => {
  latestShoesHTML += `
    <div class="carousel-item">
      <div class="card card-compact bg-base-100 w-96 shadow-xl">
        <figure class="flex items-center justify-center h-[350px]">
          <img 
            src="${shoes.image}" 
            class="w-auto h-full object-contain"
            alt="${shoes.name}"
          />
        </figure>
        <div class="card-body text-left">
          <h2 class="card-title text-2xl">${shoes.name}</h2>
          <p class="text-slate-500 leading-3 text-lg">Basketball shoes</p>
          <div class="js-added-to-cart-alert-${shoes.id} flex items-center gap-1 text-green-700 font-medium opacity-0">
            <img src="/images/checkmark.png" class="w-5" alt="Added" /> Added
          </div>
          <div class="card-actions justify-end items-center my-3">
            <button class="js-show-addtocart-modal bg-green-500 py-3 px-5 rounded-md font-bold hover:bg-green-600">Add to Cart</button>
            <button class="btn bg-orange-500 hover:bg-orange-600">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.getElementById('js-container-latest-shoes').innerHTML = latestShoesHTML;

// ✅ Add to cart modal event listeners
document.querySelectorAll('.js-show-addtocart-modal').forEach((showModal, index) => {
  showModal.addEventListener('click', () => {
    const selectedShoe = latestShoes[index];
    showAddToCartModal(selectedShoe);
  });
});

// ✅ Properly assign function to onload
window.onload = () => updateCartQuantity();

// ✅ Handle "Shop Now" button safely
const buttonShopNow = document.querySelector('.js-shop-now-btn');
if (buttonShopNow) {
  buttonShopNow.addEventListener('mouseover', () => {
    buttonShopNow.classList.add('animate-rotate');
  });
  buttonShopNow.addEventListener('mouseout', () => {
    buttonShopNow.classList.remove('animate-rotate');
  });
}
