const restaurants = [
    { id: 1, name: "Dominos Pizza", type: "Pizza", photo: "images/dominos.png" },
    { id: 2, name: "Burger King", type: "Burgers", photo: "images/bk.png" },
    { id: 3, name: "Sushico", type: "Sushi", photo: "images/sushico.jpeg" },
];

const menus = {
    1: [
        { id: 1, name: "Margherita Pizza", price: 12.99, photo: "images/margarita.jpg" },
        { id: 2, name: "Pepperoni Pizza", price: 14.99, photo: "images/pepperonni.png" },
        { id: 3, name: "Veggie Pizza", price: 11.99, photo: "images/veggiepizza.jpg" },
    ],
    2: [
        { id: 4, name: "Big King", price: 8.99,photo: "images/bigking.jpeg" },
        { id: 5, name: "Cheeseburger", price: 9.99,photo: "images/cheeseburger.jpeg" },
        { id: 6, name: "Whopper", price: 7.99,photo: "images/whopper.jpeg" },
    ],
    3: [
        { id: 7, name: "California Roll", price: 10.99,photo: "images/calroll.png" },
        { id: 8, name: "Spicy Tuna Roll", price: 12.99,photo: "images/spicytuna.jpeg" },
        { id: 9, name: "Salmon Nigiri", price: 15.99,photo: "images/nigri.jpeg" },
    ],
};

let currentRestaurantId = null;
let order = [];


document.getElementById('login-form')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (email === "test@example.com" && password === "123456") {
        alert("Login successful!");
        window.location.href = "./index.html";
    } else {
        alert("Invalid email or password.");
    }
});


const loadRestaurants = () => {
    const restaurantList = document.getElementById('restaurant-list');
    restaurantList.innerHTML = '';
    restaurants.forEach((restaurant) => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            <img src="${restaurant.photo}" alt="${restaurant.name}" class="restaurant-photo">
            <h3>${restaurant.name}</h3>
            <p>Type: ${restaurant.type}</p>
            <button onclick="selectRestaurant(${restaurant.id})">View Menu</button>
        `;
        restaurantList.appendChild(div);
    });
};

const selectRestaurant = (restaurantId) => {
    currentRestaurantId = restaurantId;
    document.getElementById('restaurants').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    loadMenu(restaurantId);
};

const loadMenu = (restaurantId) => {
    const menuContainer = document.getElementById('menu-items');
    menuContainer.innerHTML = '';
    menus[restaurantId].forEach((item) => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            ${item.photo ? `<img src="${item.photo}" alt="${item.name}" class="menu-photo">` : ''}
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)}</p>
            <button onclick="addToOrder(${item.id})">Add to Order</button>
        `;
        menuContainer.appendChild(div);
    });
};

Order = (itemId) => {
    const menuItems = Object.values(menus).flat();
    const item = menuItems.find((menuItem) => menuItem.id === itemId);
    order.push(item);
    updateOrder();
};

const updateOrder = () => {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';
    order.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        orderList.appendChild(li);
    });
};

const submitOrder = () => {
    alert("Order submitted successfully!");
    order = [];
    updateOrder();
};

document.getElementById('back-to-restaurants')?.addEventListener('click', () => {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('restaurants').style.display = 'block';
});

window.onload = () => {
    loadRestaurants();
};
