let btn1=document.getElementById("maincard");
let card=document.getElementById("cartModal");
let del=document.getElementById("del");
let trash=document.getElementById("trash");

btn1.addEventListener("click",function () {
    card.classList.toggle("d-none");
})

trash.addEventListener("click",function () {
    trash.parentElement.parentElement.parentElement.remove();
})

let toBasketbtns = document.querySelectorAll(".ti-bag");

toBasketbtns.forEach(btn => {
  btn.parentElement.addEventListener("click", function () {
    addBasketItem(this);
    fillBasket();
  })
});

function addBasketItem(elem){
  checkBasket();
  let basket = JSON.parse(localStorage.getItem("basket"));
  let basketItem = getBasketItem(elem);
  if(basket.find(b => b.id == basketItem.id) == undefined){
    basket.push(basketItem);
  }
  else{
    basket.find(b => b.id == basketItem.id).count += 1;
  }
  localStorage.setItem("basket",JSON.stringify(basket))
}

function getBasketItem(elem) {
  return{
    id : elem.dataset.id,
    price : elem.parentElement.previousElementSibling.children[0].innerText.substring(1,elem.parentElement.previousElementSibling.children[0].innerText.length),
    model : elem.parentElement.previousElementSibling.previousElementSibling.innerText.toUpperCase(),
    img : elem.parentElement.parentElement.previousElementSibling.src,
    count : 1
  }
}



function fillBasket() {
  checkBasket();
  let basketItems = JSON.parse(localStorage.getItem("basket"));
  cardTableBody.innerHTML = "";
  let itemCount = 0;
  basketItems.forEach(
    item=>{
      itemCount += item.count;
      cardTableBody.innerHTML += 
      `<div class="col-md-2">
      <img src="${item.img}"
        class="img-fluid" alt="Generic placeholder image">
    </div>
    <div class="col-md-2 d-flex justify-content-center">
      <div>
        <p class="small text-muted mb-4 pb-2">Name</p>
        <p class="lead fw-normal mb-0">${item.model}</p>
      </div>
    </div>
    
    <div class="col-md-2 d-flex justify-content-center">
      <div>
        <p class="small text-muted mb-4 pb-2">Quantity</p>
        <p class="lead fw-normal mb-0">${item.count}</p>
      </div>
    </div>
    <div class="col-md-2 d-flex justify-content-center">
      <div>
        <p class="small text-muted mb-4 pb-2">Price</p>
        <p class="lead fw-normal mb-0">$${item.price}</p>
      </div>
    </div>
    <div class="col-md-2 d-flex justify-content-center">
      <div>
        <p class="small text-muted mb-4 pb-2">Total</p>
        <p class="lead fw-normal mb-0">${parseInt(item.price)*item.count}$</p>
      </div>
    </div>
    <div class="col-md-2 d-flex justify-content-center">
        <div>
          <p id="del" class="small text-muted mb-4 pb-2">Delete</p>
          <i id="trash" class="bi bi-trash3"></i>
            
        </div>`
    }
  )
  document.querySelector(".badge").innerText = itemCount;
}

checkBasket();
fillBasket() 

function checkBasket() {
  if (!localStorage.getItem("basket")) {
    localStorage.setItem("basket",JSON.stringify([]))
  }
}