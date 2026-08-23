


# 🛒 E-Commerce Store

A modern **full-stack E-Commerce Web Application** built using **HTML, CSS, JavaScript, Node.js, Express.js, and MySQL**.

The application provides a complete shopping experience including user authentication, product browsing, search and filtering, shopping cart, checkout, and order management.

---

## ✨ Features

### 👤 User Authentication

* Create a new account
* User login and logout
* User information display
* Secure backend authentication flow

### 🛍️ Product Management

* Products loaded dynamically from MySQL database
* Product images
* Product categories
* Product prices and descriptions
* Search products by name
* Filter products by category

### 🛒 Shopping Cart

* Add products to cart
* View selected products
* Remove products from cart
* Automatic cart total calculation
* Cart item counter

### 📦 Order Management

* Checkout functionality
* Place orders
* Store orders in database
* View previous orders
* Display ordered products and order details

### 🎨 User Interface

* Responsive design
* Modern navigation bar
* Product card layout
* Responsive product grid
* Mobile-friendly interface
* Clean and simple shopping experience

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js
* REST API

### Database

* MySQL

### Development Tools

* VS Code
* Git
* GitHub
* MySQL Workbench

---

## 📂 Project Structure

```text
E-Commerce-Store/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   │
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   │
│   └── images/
│       ├── shoe.jpg
│       └── ...
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/E-Commerce-Store.git
```

Move into the project directory:

```bash
cd E-Commerce-Store
```

---

### 2. Install Backend Dependencies

Go to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

### 3. Configure MySQL

Create a MySQL database.

Example:

```sql
CREATE DATABASE ecommerce_db;
```

Configure your database connection inside:

```text
backend/config/db.js
```

Example configuration:

```javascript
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "YOUR_PASSWORD",
    database: "ecommerce_db"
});

module.exports = db;
```

> Replace `YOUR_PASSWORD` with your MySQL password.

---

### 4. Start the Backend Server

Inside the backend folder:

```bash
node server.js
```

The server will start at:

```text
http://localhost:5000
```

You should see:

```text
Server running on http://localhost:5000
```

---

## 🔌 API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Products

```text
GET /api/products
POST /api/products
```

### Orders

```text
POST /api/orders
GET /api/orders
```

> API endpoints may vary depending on the final backend implementation.

---

## 🛒 Application Flow

```text
User
  │
  ▼
Create Account / Login
  │
  ▼
Browse Products
  │
  ├── Search
  ├── Category Filter
  │
  ▼
Add to Cart
  │
  ▼
Review Cart
  │
  ▼
Checkout
  │
  ▼
Order Stored in MySQL
  │
  ▼
View My Orders
```

---

## 📸 Screenshots

Add screenshots of your application here:

```text
screenshots/
├── home.png
├── products.png
├── cart.png
├── login.png
└── orders.png
```

Example:

```markdown
![Home Page](screenshots/home.png)
```

---

## 🔐 Security

The project follows a backend-based architecture where:

* User data is handled through the backend.
* Product data is stored in MySQL.
* Orders are stored in the database.
* Frontend communicates with the backend through REST APIs.

> For production deployment, environment variables, password hashing, authentication tokens, validation, and additional security measures should be implemented.

---

## 🚀 Future Improvements

* 💳 Online payment integration
* 🔐 JWT authentication
* 🔒 Password hashing
* 👨‍💼 Admin dashboard
* 📊 Sales analytics
* ❤️ Wishlist
* ⭐ Product reviews and ratings
* 📍 Order tracking
* 🖼️ Cloud image storage
* ☁️ Deployment using cloud services

---

## 🎯 Project Objective

The main objective of this project is to build a practical **full-stack e-commerce application** and understand how the frontend, backend, REST APIs, and relational database work together in a real-world application.

---

## 👨‍💻 Developer

**Vikash Kumar**

B.Tech CSE Student

### Connect With Me

* GitHub: `https://github.com/Vikashkumar920`
* LinkedIn: `https://www.linkedin.com/in/vikash-kumar-5966a437/`
* LeetCode: `https://leetcode.com/u/vikash0954/`

---

## ⭐ Support

If you found this project useful, consider giving the repository a ⭐ on GitHub.

---

### 📌 Built With

**HTML • CSS • JavaScript • Node.js • Express.js • MySQL**

**Made with ❤️ by Vikash Kumar**
