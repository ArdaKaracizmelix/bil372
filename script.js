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

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert(`Login successful! Welcome ${user.firstName} ${user.lastName}`);
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
}

Order = (itemId) => {
    const menuItems = Object.values(menus).flat();
    const item = menuItems.find((menuItem) => menuItem.id === itemId);
    order.push(item);
    updateOrder();
};
const updateOrder = () => {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';
    let totalPrice = 0;

    order.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} x${item.quantity} - $${itemTotal.toFixed(2)}
            <button class="remove-button" onclick="removeFromOrder(${item.id})">-</button>
        `;
        orderList.appendChild(li);
    });

    const totalElement = document.createElement('li');
    totalElement.className = 'total-price';
    totalElement.innerHTML = `<strong>Total: $${totalPrice.toFixed(2)}</strong>`;
    orderList.appendChild(totalElement);
};
const addToOrder = (itemId) => {
    const menuItems = Object.values(menus).flat();
    const item = menuItems.find((menuItem) => menuItem.id === itemId);

    if (order.length > 0) {
        const currentRestaurantName = restaurants.find(r => r.id === currentRestaurantId).name;
        const existingRestaurantName = restaurants.find(r => r.id === order[0].restaurantId).name;

        if (currentRestaurantName !== existingRestaurantName) {
            alert("You cannot order from multiple restaurants at the same time!");
            return;
        }
    }

    // Aynı üründen varsa miktarı artır
    const existingItem = order.find((orderItem) => orderItem.id === itemId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        // Ürünü sepete ekle ve restoran ID'sini takip et
        order.push({ ...item, quantity: 1, restaurantId: currentRestaurantId });
    }
    updateOrder();
};

const removeFromOrder = (itemId) => {
    const index = order.findIndex((item) => item.id === itemId);
    if (index !== -1) {
        if (order[index].quantity > 1) {
            order[index].quantity--;
        } else {
            order.splice(index, 1);
        }
        updateOrder();
    }
};
const submitOrder = () => {
    if (order.length === 0) {
        alert("Your order is empty!");
    } else {
        alert("Order submitted successfully!");
        order = [];
        updateOrder();
    }
};
const users = JSON.parse(localStorage.getItem('users')) || [];

// Kayıt formu submit eventi
document.getElementById('signup-form')?.addEventListener('submit', function (event) {
    event.preventDefault();

    // Form verilerini al
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('new-email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const province = document.getElementById('province').value.trim();
    const district = document.getElementById('district').value.trim();
    const neighborhood = document.getElementById('neighborhood').value.trim();
    const apartmentNumber = document.getElementById('apartment-number').value.trim();
    const doorNumber = document.getElementById('door-number').value.trim();
    const password = document.getElementById('new-password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    // Şifrelerin eşleşip eşleşmediğini kontrol et
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Aynı e-posta adresi ile kayıt yapılmış mı?
    if (users.find(user => user.email === email)) {
        alert("User already exists. Please log in.");
        return;
    }

    // Yeni kullanıcı oluştur
    const newUser = {
        firstName,
        lastName,
        email,
        phone,
        address: {
            province,
            district,
            neighborhood,
            apartmentNumber,
            doorNumber,
        },
        password,
    };

    // Kullanıcıyı ekle ve localStorage'a kaydet
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert("Sign up successful! You can now log in.");

    // Login sayfasına yönlendir
    window.location.href = "login.html";
});
document.getElementById('back-to-restaurants').addEventListener('click', () => {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('restaurants').style.display = 'block';
});
window.onload = () => {
    loadRestaurants();
};

// Order button click event
document.getElementById('submit-order').addEventListener('click', function() {
    var selectedItems = getOrderItems(); // Sipariş edilen öğeleri al

    // Sipariş öğelerinin bir nesne listesi olarak hazırlanması
    var orderItems = selectedItems.map(item => {
        return {
            name: item.name,
            quantity: item.quantity
        };
    });

    // Sipariş verilerini URL parametreleri olarak iletmek
    var url = "cart.html?order=" + encodeURIComponent(JSON.stringify(orderItems));

    // Cart.html sayfasına yönlendirme
    window.location.href = url;
});

// Order items'ları almak için örnek bir fonksiyon
function getOrderItems() {
    var orderItems = [];
    var orderList = document.getElementById('order-list').children;

    for (var i = 0; i < orderList.length; i++) {
        var item = orderList[i].textContent;
        var name = item.split(' ')[0]; // İlk kelimeyi ismen kabul edelim
        var quantity = parseInt(item.split(' ')[1] || 1); // Eğer miktar belirtilmemişse 1 kabul et

        orderItems.push({ name: name, quantity: quantity }); // Listeye ekle
    }
    

    return orderItems;
}
