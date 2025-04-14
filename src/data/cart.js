export let carts = JSON.parse(localStorage.getItem('carts')) || [];

export function showAddToCartModal(shoe) {
    const addToCartHTML = `
      <dialog id="my_modal_${shoe.id}" class="modal modals font-serif">
        <div class="modal-box flex flex-col justify-center items-center p-5">
          <h3 class="text-xl font-bold">Added to cart </h3>
          <h3>${shoe.name}</h3>
          <button class="border my-3 rounded-md bg-slate-100 shadow-md">
            <img src="${shoe.image}" alt="" class="w-[130px] h-[130px] block">
          </button>
          <div class="flex gap-5 w-full justify-center items-center">
            <label for="quantity">Quantity</label>
            <input type="number" class="js-selector-quantity-${shoe.id} border border-slate-400 rounded-md shadow-md pl-2" id="quantity" 
            name="quantity" min="1" max="10" value="1" class="border rounded-md bg-slate-100 px-2 shadow-md">
          </div>
          <div class="modal-action">
            <form method="dialog">
              <button class="js-addToCart-btn btn bg-green-500 text-white hover:bg-green-600" data-shoe-id="${shoe.id}">Add to Cart</button>
              <button class="btn bg-red-500 text-white hover:bg-red-600">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    `;
  
    // Append the modal to the body (or a specific container)
    document.body.insertAdjacentHTML('beforeend', addToCartHTML);
  
    // Show the modal
    const modal = document.getElementById(`my_modal_${shoe.id}`);
    modal.showModal();
  
    // Add event listener to remove modal after closing
    modal.addEventListener('close', () => {
      modal.remove();
    });
  
  document.querySelectorAll('.js-addToCart-btn').forEach((addToCart) => {
    let addedMessageTimeoutId;
      addToCart.addEventListener('click', () => {
        const {shoeId} = addToCart.dataset;
        const selectorQuantity = document.querySelector(`.js-selector-quantity-${shoeId}`);
        const quantity = Number(selectorQuantity.value);
        const addedMessage = document.querySelector(`.js-added-to-cart-alert-${shoeId}`)
        if(addedMessage.classList.contains(`js-added-to-cart-alert-${shoeId}`)){
          addedMessage.style.opacity ='1';
        }

        if(addedMessageTimeoutId){
          clearTimeout(addedMessageTimeoutId);
        }
        const timeOutId = setTimeout(() => {
          addedMessage.style.opacity = '0';
        }, 3000);
        addedMessageTimeoutId = timeOutId;

        let matchingShoe = carts.find(cartItem => cartItem.id === shoeId);

        if (matchingShoe) {
          matchingShoe.quantity += quantity;
        } else {
          carts.push({
            id: shoeId,
            quantity: quantity
          });
        }
        saveToStorage();
        updateCartQuantity(); 
      });
  });
  
  }
  function saveToStorage(){
    localStorage.setItem('carts', JSON.stringify(carts));
  }
  export function updateCartQuantity(){
    let cartQuantity = 0;
        
    carts.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    
    

    document.querySelector('.js-cart-items-total').innerHTML = cartQuantity;
    document.querySelector('.js-total-cart-items').innerHTML = `${cartQuantity} items`;
   
    saveToStorage();

  };

  export function removeFromCart(shoeId){
    carts = carts.filter(cartItem => cartItem.id !== shoeId );
    saveToStorage();
  }
  
  export function updateQuantity(shoeId , inputValue){
   let machingItem = carts.find(cartItem => cartItem.id === shoeId);

   if(machingItem){
    machingItem.quantity = inputValue;
   }
    saveToStorage();

  };