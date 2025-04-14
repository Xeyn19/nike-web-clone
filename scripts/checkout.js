import { carts , removeFromCart , updateCartQuantity, updateQuantity} from "/data/cart.js";
import { latestShoes } from "/data/Latest.js";
import '/data/cart oop.js';

let checkOutHTML = '';

carts.forEach((cartItem) => {
    const shoeId = cartItem.id;

    let matchingShoe;

    latestShoes.forEach((shoe) => {
        if(shoe.id === shoeId){
            matchingShoe = shoe;
        }
    });
    

checkOutHTML += `
       <div class="flex flex-row rounded-lg shadow-2xl bg-slate-200 border-none border w-[450px] py-5 px-2 gap-5">
                <div class="shoePic">
                    <img src="${matchingShoe.image}" alt="" class="w-40">
                </div>
                <div class="flex justify-center flex-col">
                    <div class="product-name">
                        <span class="font-bold text-lg"> Product name:</span> ${matchingShoe.name}
                    </div>
                    <div class="product-quantity">
                       <span class="font-bold text-lg"> Quantity:</span> ${cartItem.quantity}
                    </div>
                    <div class="update-delete-links">
                           <a href ="" class="js-update-quantity-link js-update-link hover:underline"
                            data-shoe-id="${matchingShoe.id}">
                                Update
                            </a>
                            <input class="quantity-input hidden js-quantity-save-input-${matchingShoe.id} w-[40px]
                             rounded-md outline-none" data-shoe-id="${matchingShoe.id}"/>
                            <a href="" class="js-save-quantity-link hover:underline hidden js-save-link-${matchingShoe.id}" 
                                data-shoe-id="${matchingShoe.id}">Save</a>
                            <a href="" class="js-delete-link hover:underline" data-shoe-id="${matchingShoe.id}"  >delete</a>
                    </div>
                </div>
            </div>
`;
});
document.querySelector('.js-checkout-ctn').innerHTML = checkOutHTML;
const totalQuantity = carts.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
document.querySelector('.js-checkout-total').innerHTML = `Total: (${totalQuantity})items`;

document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {
    deleteLink.addEventListener('click', () => {
        const {shoeId} = deleteLink.dataset;
        removeFromCart(shoeId);

    });
});

document.querySelectorAll('.js-update-quantity-link').forEach((updateLink) => {
    updateLink.addEventListener('click', (event) => {
        event.preventDefault(); 
        const {shoeId} = updateLink.dataset;
        const inputUpdateQuantity = document.querySelector(`.js-quantity-save-input-${shoeId}`);
        const saveLinkAppear = document.querySelector(`.js-save-link-${shoeId}`);

        if(inputUpdateQuantity && saveLinkAppear){
            inputUpdateQuantity.classList.remove('hidden');
            saveLinkAppear.classList.remove('hidden');
        }
    });
});

document.querySelectorAll('.js-save-quantity-link').forEach((saveLink) => {
    saveLink.addEventListener('click', () => {
        const {shoeId} = saveLink.dataset;
        const inputElement = document.querySelector(`.js-quantity-save-input-${shoeId}`);
        const inputValue = Number(inputElement.value);

        if(inputValue > 100 ){
            return alert('Sorry maximum quantity are only 100');
        }
        if(inputValue <= 0 || !inputValue){
            return alert('please select a valid quantity');
        }
        updateQuantity(shoeId, inputValue);

    });
});