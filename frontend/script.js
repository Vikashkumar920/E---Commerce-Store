const productsContainer =
  document.getElementById("products-container");

const cartCount =
  document.getElementById("cart-count");

const cartItems =
  document.getElementById("cart-items");

const cartTotal =
  document.getElementById("cart-total");

const registerForm =
  document.getElementById("register-form");

const loginForm =
  document.getElementById("login-form");

const userInfo =
  document.getElementById("user-info");

const logoutBtn =
  document.getElementById("logout-btn");

const ordersContainer =
  document.getElementById("orders-container");

const searchInput =
  document.getElementById("search-input");

const categoryFilter =
  document.getElementById("category-filter");


let products = [];

let cart = [];

let loggedInUser = null;


/* ==============================
   REGISTER
============================== */

registerForm.addEventListener(
  "submit",
  async function (event) {

    event.preventDefault();

    const name =
      document.getElementById(
        "register-name"
      ).value.trim();

    const email =
      document.getElementById(
        "register-email"
      ).value.trim();

    const password =
      document.getElementById(
        "register-password"
      ).value;


    try {

      const response =
        await fetch(
          "http://localhost:5000/api/auth/register",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              name,
              email,
              password
            })
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        alert(
          data.message ||
          "Registration failed"
        );

        return;
      }


      alert(
        `Registration successful!\nUser ID: ${data.userId}`
      );


      registerForm.reset();


    } catch (error) {

      console.error(error);

      alert(
        "Unable to connect to the server."
      );
    }
  }
);


/* ==============================
   LOGIN
============================== */

loginForm.addEventListener(
  "submit",
  async function (event) {

    event.preventDefault();


    const email =
      document.getElementById(
        "login-email"
      ).value.trim();

    const password =
      document.getElementById(
        "login-password"
      ).value;


    try {

      const response =
        await fetch(
          "http://localhost:5000/api/auth/login",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              email,
              password
            })
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        alert(
          data.message ||
          "Login failed"
        );

        return;
      }


      loggedInUser = data;


      userInfo.textContent =
        `👤 ${data.user.name}`;


      logoutBtn.style.display =
        "block";


      alert("Login successful!");


      loginForm.reset();


    } catch (error) {

      console.error(error);

      alert(
        "Unable to connect to the server."
      );
    }
  }
);


/* ==============================
   LOAD PRODUCTS
============================== */

async function loadProducts() {

  try {

    const response =
      await fetch(
        "http://localhost:5000/api/products"
      );


    if (!response.ok) {

      throw new Error(
        "Failed to fetch products"
      );
    }


    products =
      await response.json();


    loadCategories();


    displayProducts(products);


  } catch (error) {

    console.error(error);


    productsContainer.innerHTML = `
            <div class="empty-orders">
                <p>
                    Failed to load products.
                </p>
            </div>
        `;
  }
}


/* ==============================
   LOAD CATEGORIES
============================== */

function loadCategories() {

  categoryFilter.innerHTML = `
        <option value="all">
            All Categories
        </option>
    `;


  const categories = [
    ...new Set(
      products
        .map(product => product.category)
        .filter(category => category)
    )
  ];


  categories.forEach(category => {

    categoryFilter.innerHTML += `
            <option value="${category}">
                ${category}
            </option>
        `;
  });
}


/* ==============================
   DISPLAY PRODUCTS
============================== */

function displayProducts(productList) {

  productsContainer.innerHTML = "";


  if (productList.length === 0) {

    productsContainer.innerHTML = `
            <div class="empty-orders">
                <p>
                    No products found.
                </p>
            </div>
        `;

    return;
  }


  productList.forEach(product => {

    const imageName =
      product.image
        ? product.image
        : "default.jpg";


    productsContainer.innerHTML += `

            <div class="product-card">

                <img
                    src="images/${imageName}"
                    alt="${product.name}"
                    class="product-image"
                    onerror="
                        this.onerror=null;
                        this.src='images/default.jpg';
                    "
                >


                <h3>
                    ${product.name}
                </h3>


                <p>
                    ${product.description}
                </p>


                <p class="price">
                    ₹${product.price}
                </p>


                <p>
                    Category:
                    ${product.category}
                </p>


                <p>
                    Stock:
                    ${product.stock}
                </p>


                <button
                    class="cart-btn"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>
        `;
  });
}


/* ==============================
   SEARCH + FILTER
============================== */

function filterProducts() {

  const searchText =
    searchInput.value
      .toLowerCase()
      .trim();


  const selectedCategory =
    categoryFilter.value;


  const filteredProducts =
    products.filter(product => {

      const productName =
        String(product.name)
          .toLowerCase();


      const productDescription =
        String(product.description)
          .toLowerCase();


      const matchesSearch =
        productName.includes(searchText) ||
        productDescription.includes(searchText);


      const matchesCategory =
        selectedCategory === "all" ||
        product.category ===
        selectedCategory;


      return (
        matchesSearch &&
        matchesCategory
      );
    });


  displayProducts(
    filteredProducts
  );
}


searchInput.addEventListener(
  "input",
  filterProducts
);


categoryFilter.addEventListener(
  "change",
  filterProducts
);


/* ==============================
   ADD TO CART
============================== */

function addToCart(productId) {

  const product =
    products.find(
      product =>
        Number(product.id) ===
        Number(productId)
    );


  if (!product) {

    console.log(
      "Product not found:",
      productId
    );

    return;
  }


  const stock =
    Number(product.stock);


  if (stock <= 0) {

    alert(
      "Product is out of stock!"
    );

    return;
  }


  const existingItem =
    cart.find(
      item =>
        Number(item.id) ===
        Number(productId)
    );


  if (existingItem) {

    if (
      existingItem.quantity >=
      stock
    ) {

      alert(
        "Maximum available stock reached!"
      );

      return;
    }


    existingItem.quantity++;


  } else {

    cart.push({

      ...product,

      quantity: 1

    });
  }


  updateCart();


  alert(
    "Product added to cart!"
  );
}


/* ==============================
   UPDATE CART
============================== */

function updateCart() {

  cartCount.textContent =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );


  cartItems.innerHTML = "";


  if (cart.length === 0) {

    cartItems.innerHTML =
      "<p>Your cart is empty.</p>";

    cartTotal.textContent =
      "0";

    return;
  }


  let total = 0;


  cart.forEach(item => {

    const itemTotal =
      Number(item.price) *
      Number(item.quantity);


    total += itemTotal;


    cartItems.innerHTML += `

            <div class="cart-item">

                <h3>
                    ${item.name}
                </h3>


                <p>
                    Price:
                    ₹${item.price}
                </p>


                <p>

                    Quantity:

                    <button
                        onclick="decreaseQuantity(${item.id})"
                    >
                        -
                    </button>


                    ${item.quantity}


                    <button
                        onclick="increaseQuantity(${item.id})"
                    >
                        +
                    </button>

                </p>


                <p>
                    Item Total:
                    ₹${itemTotal}
                </p>


                <button
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>
        `;
  });


  cartTotal.textContent =
    total;
}


/* ==============================
   INCREASE QUANTITY
============================== */

function increaseQuantity(productId) {

  const item =
    cart.find(
      item =>
        Number(item.id) ===
        Number(productId)
    );


  if (!item) {
    return;
  }


  if (
    item.quantity >=
    Number(item.stock)
  ) {

    alert(
      "Maximum available stock reached!"
    );

    return;
  }


  item.quantity++;


  updateCart();
}


/* ==============================
   DECREASE QUANTITY
============================== */

function decreaseQuantity(productId) {

  const item =
    cart.find(
      item =>
        Number(item.id) ===
        Number(productId)
    );


  if (!item) {
    return;
  }


  if (item.quantity > 1) {

    item.quantity--;

  } else {

    removeFromCart(productId);

    return;
  }


  updateCart();
}


/* ==============================
   REMOVE FROM CART
============================== */

function removeFromCart(productId) {

  cart =
    cart.filter(
      item =>
        Number(item.id) !==
        Number(productId)
    );


  updateCart();
}


/* ==============================
   CHECKOUT
============================== */

async function checkout() {

  if (cart.length === 0) {

    alert(
      "Your cart is empty!"
    );

    return;
  }


  if (!loggedInUser) {

    alert(
      "Please login before placing an order."
    );

    return;
  }


  try {

    const orderItems =
      cart.map(item => ({

        product_id:
          item.id,

        quantity:
          item.quantity,

        price:
          Number(item.price)

      }));


    const response =
      await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            user_id:
              loggedInUser.user.id,

            items:
              orderItems

          })
        }
      );


    const data =
      await response.json();


    if (!response.ok) {

      alert(
        data.message ||
        "Failed to place order"
      );

      return;
    }


    alert(
      `Order placed successfully!\n\n` +
      `Order ID: ${data.orderId}\n` +
      `Total Amount: ₹${data.totalAmount}`
    );


    cart = [];


    updateCart();


  } catch (error) {

    console.error(error);

    alert(
      "Unable to connect to the server."
    );
  }
}


/* ==============================
   LOAD MY ORDERS
============================== */

async function loadMyOrders() {

  if (!loggedInUser) {

    alert(
      "Please login to view your orders."
    );

    return;
  }


  const userId =
    loggedInUser.user.id;


  try {

    const response =
      await fetch(
        `http://localhost:5000/api/orders/user/${userId}`
      );


    const orders =
      await response.json();


    if (!response.ok) {

      ordersContainer.innerHTML =
        "<p>Failed to load orders.</p>";

      return;
    }


    ordersContainer.innerHTML =
      "";


    if (orders.length === 0) {

      ordersContainer.innerHTML =
        "<p>No orders found.</p>";

      return;
    }


    const groupedOrders = {};


    orders.forEach(order => {

      if (
        !groupedOrders[
        order.order_id
        ]
      ) {

        groupedOrders[
          order.order_id
        ] = {

          order_id:
            order.order_id,

          total_amount:
            order.total_amount,

          status:
            order.status,

          created_at:
            order.created_at,

          items: []

        };
      }


      groupedOrders[
        order.order_id
      ].items.push({

        product_name:
          order.product_name,

        quantity:
          order.quantity,

        price:
          order.price,

        image:
          order.image

      });
    });


    Object.values(
      groupedOrders
    ).forEach(order => {

      const date =
        new Date(
          order.created_at
        ).toLocaleString();


      let productsHTML = "";


      order.items.forEach(item => {

        const itemTotal =
          Number(item.price) *
          Number(item.quantity);


        const imageName =
          item.image
            ? item.image
            : "default.jpg";


        productsHTML += `

                    <div class="order-product">

                        <img
                            src="images/${imageName}"
                            alt="${item.product_name}"
                            class="order-product-image"
                            onerror="
                                this.onerror=null;
                                this.src='images/default.jpg';
                            "
                        >


                        <div class="order-product-info">

                            <h4>
                                ${item.product_name}
                            </h4>


                            <p>
                                Quantity:
                                ${item.quantity}
                            </p>


                            <p>
                                Price:
                                ₹${item.price}
                            </p>


                            <p>
                                Item Total:
                                ₹${itemTotal}
                            </p>

                        </div>

                    </div>
                `;
      });


      ordersContainer.innerHTML += `

                <div class="order-card">

                    <h3>
                        Order #${order.order_id}
                    </h3>


                    <p>
                        Total:
                        ₹${order.total_amount}
                    </p>


                    <p>
                        Status:
                        <strong>
                            ${order.status}
                        </strong>
                    </p>


                    <p>
                        Date:
                        ${date}
                    </p>


                    <hr>


                    <h4>
                        Products
                    </h4>


                    ${productsHTML}

                </div>
            `;
    });


  } catch (error) {

    console.error(error);

    ordersContainer.innerHTML =
      "<p>Unable to load orders.</p>";
  }
}


/* ==============================
   LOGOUT
============================== */

function logout() {

  loggedInUser = null;


  userInfo.textContent =
    "Guest";


  logoutBtn.style.display =
    "none";


  cart = [];


  updateCart();


  ordersContainer.innerHTML = `

        <div class="empty-orders">

            <p>

                Login and click
                <strong>"My Orders"</strong>
                to view your orders.

            </p>

        </div>
    `;


  alert(
    "Logged out successfully!"
  );
}


/* ==============================
   START APPLICATION
============================== */

loadProducts();

updateCart();