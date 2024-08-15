# Shopping Application

## Overview

This shopping application allows users to browse product listing with detailed information, add items to their cart, update item quantities, and remove items. It features user authentication, persistent storage, and real-time updates.

## Features

1. **User Authentication**
   - User Registration and Login using JWT.
   - Protected routes using authentication middleware.

2. **Product Store**
   - Product list with properties: Name, Image, Price, Quantity.
   - Prodcut detail page with addional info. like Description, SKU and related products section.

3. **Cart Management**
   - Add items to the cart with an "Add to Cart" button.
   - Update item quantities and remove items from the cart.
   - Displayed the total price of the cart, updating live with changes.

3. **Persistent State**
   - Used MongoDB to persist cart data.

4. **Real-Time Updates**
   - Used WebSocket for real-time cart updates.

5. **Frontend Interface**
   - Created a simple frontend using EJS templates to interact with the backend API.
   - Used Bootstrap in conjunction with EJS templates (only HTML and CSS part of Bootstrap. No Bootstrap JS features are used.)

## Technologies Used

- **Backend:** Node.js, Express.js, MongoDB
- **Frontend:** EJS templates
- **Real-Time Updates:** WebSocket
- **Authentication:** JSON Web Token (JWT)
- **Database:** MongoDB

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or later)
- [MongoDB](https://www.mongodb.com/) (running locally or a cloud instance)

1. **Download the source code and open "shopping-app" folder in the terminal**

2.	**Install Dependencies**
    - npm install

## Steps to Running the Application Locally

1. **Set Up Environment Variables**

   - Create a .env file in the root directory of the project and add the following configuration:

      MONGO_URI=mongodb://localhost:27017
      PORT=3000

2. **Start the Server**
    - npm start

3.	**Open the Application**
    - Open your browser and navigate to http://localhost:3000 to access the Shopping application.

## Usage

1. **User Authentication**

   - **Register:** `auth/register` - Create a new user account.
   - **Login:** `auth/login` - Existing user can login and get Authenticated via JWT.

2. **Product List**

   - **Get Products:** `GET /products` - Retrieve a list of all products. (Default products are added to DB using seedProducts.js)
   - **Product Details:** `GET /products/:id` - View detailed information about a product, including Description, SKU and other related products.
   - **Add to Cart:** `POST /cart` - Add an item to the cart.

3. **Cart Management**

   - **View Cart:** `GET /cart` - View items in your cart. Cart Count is alawys visible in the header for easy navigation.
   - **Update Quantity:** `POST /cart/:itemId` - Adjust the quantity of an item in the cart.
   - **Remove Item:** `POST /cart/:itemId` - Remove an item from the cart.
   - **Total Price:** The total price updates live with changes in quantity or cart contents.

## Files and Folder Structure

shopping-app/
├── config/
│   └── db.js                 # Database connection setup
├── controllers/
│   ├── authController.js     # Handles user authentication
│   ├── cartController.js     # Manages shopping cart operations
│   └── productController.js  # Handles product-related operations
├── models/
│   ├── Cart.js               # Mongoose model for cart items
│   ├── Product.js            # Mongoose model for products
│   └── User.js               # Mongoose model for users
├── public/
│   ├── styles.css            # Custom styles for the application including Bootstrap's CSS.
│   └── scripts.js            # Custom JavaScript for client-side functionality
├── routes/
│   ├── authRoutes.js         # Routes for authentication (login, register)
│   ├── cartRoutes.js         # Routes for managing the shopping cart
│   └── productRoutes.js      # Routes for managing products
├── views/
│   ├── index.ejs             # Home page view
│   ├── login.ejs             # Login page view
│   ├── register.ejs          # Registration page view
│   ├── products.ejs          # Page displaying the list of products
│   ├── cart.ejs              # Shopping cart page view
│   ├── product-detail.ejs    # Page displaying detailed product information
│   └── partials/             # Contains partial views used in other EJS files
│       ├── header.ejs        # Header partial view
│       ├── footer.ejs        # Footer partial view
│       ├── cart-total.ejs    # Cart total partial view
│       └── cart-counter.ejs  # Cart counter partial view
├── .env                      # Environment variables (Mongo database URI and Port Info)
├── app.js                    # Main application file (entry point)
├── package.json              # Project metadata and dependencies
├── seedProducts.js           # For Adding Default Products to the Database
└── README.md                 # Project documentation

## Error Handling

The application includes error handling for common issues:

- **400 Bad Request:** Returned when the request is malformed or missing required parameters.
- **401 Unauthorized:** Returned when authentication is required but missing or invalid.
- **404 Not Found:** Returned when the requested resource does not exist.
- **500 Internal Server Error:** Returned for unexpected server errors.

Error responses include a JSON body with a message describing the error.

## Contact

For any questions or feedback, please contact [yatin_agrawal@live.com](mailto:yatin_agrawal@live.com).