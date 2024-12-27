let menuList = document.querySelector('#menuList');
let itemsCount = document.querySelector('#itemsCount');
let summa = document.querySelector('#summa');
let orderList = document.querySelector('#orderList');

function createMenu(product) {
    return`  
        <div class="foodCard" onclick="clickMenu(event)" data-product='${JSON.stringify(product)}'>
         <img src="${product.img}" alt="" class="foodImg">
            <div>
                <div>${product.title}</div>
                <div>${product.price}</div>
            </div>
        </div>
    `
}

function renderMenu(menu) {
    let items = menu.map(el => createMenu(el));
    menuList.innerHTML = items.join('');
}
renderMenu(menuItems);

function clickMenu(event) {
    let card = JSON.parse(event.currentTarget.dataset.product);
    let index = basketTwo.findIndex(el => el.id == card.id);
    
    if (index == -1) {
        // Если продукт еще не в корзине, добавляем его с количеством 1
        basketTwo.push({ ...card, count: 1 });
    } else {
        // Если продукт уже в корзине, увеличиваем его количество и цену
        basketTwo[index].count++;
        basketTwo[index].price += card.price;
    }
    
    renderList(basketTwo);
    plusSumma();
    itemCount();
}

function createList(prod, index) {
    return ` 
        <li>
            <div>${prod.title}</div>
            <div>${prod.price}</div>
            <div>${prod.count}</div>
            <div onclick="deleteMenu(${index})" style="cursor: pointer; color: red;">X</div>
        </li>
    `
}

function deleteMenu(index) {
    if (basketTwo[index].count > 1) {
        basketTwo[index].count--;
        basketTwo[index].price -= basketTwo[index].price / basketTwo[index].count; // Обновляем цену
    } else {
        basketTwo.splice(index, 1);
    }
    renderList(basketTwo);
    plusSumma();
    itemCount();
}

function renderList(menu) {
    let items = menu.map((el, index) => createList(el, index));
    orderList.innerHTML = items.join('');
}

function plusSumma() {
    summa.innerHTML = basketTwo.reduce((total, { price }) => total + price, 0);
}

function itemCount() {
    itemsCount.innerHTML = basketTwo.reduce((total, { count }) => total + count, 0);
}


