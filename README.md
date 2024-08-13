# Shopping Cart Application

## Overview

This shopping cart application allows users to add items to their cart, update item quantities, and remove items. It features user authentication, persistent storage, and real-time updates.

## Features

1. **User Authentication**
   - Implement user registration and login using JWT.
   - Protect routes using authentication middleware.

2. **Cart Management**
   - Display a product list with properties: Name, Image, Price, Quantity.
   - Add items to the cart with an "Add to Cart" button.
   - Update item quantities and remove items from the cart.
   - Display the total price of the cart, updating live with changes.

3. **Persistent State**
   - Use MongoDB to persist cart data.

4. **Real-Time Updates**
   - Use WebSocket for real-time cart updates.

5. **Frontend Interface**
   - Create a simple frontend using EJS templates to interact with the backend API.

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

1. **Download the source code and open book-library folder in the terminal**

2.	**Install Dependencies**
    - npm install

## Steps to Running the Application Locally

1. **Start the Server**
    - npm start

2.	**Open the Application**
    - Open your browser and navigate to http://localhost:3000 to access the Shopping application.

## Usage

1. **User Authentication**

   - **Register:** `/register` - Create a new user account.
   - **Login:** `/login` - Authenticate and receive a JWT.

2. **Product List**

   - **Get Products:** `GET /products` - Retrieve a list of products.
   - **Product Details:** `GET /product/:id` - View detailed information about a product, including a description and related products.
   - **Add to Cart:** `POST /cart` - Add an item to the cart.

3. **Cart Management**

   - **View Cart:** `GET /cart` - View items in your cart.
   - **Update Quantity:** `POST /cart/:itemId` - Adjust the quantity of an item in the cart.
   - **Remove Item:** `POST /cart/:itemId` - Remove an item from the cart.
   - **Total Price:** The total price updates live with changes in quantity or cart contents.

4. **Real-Time Updates**

   - The cart updates in real-time across different sessions using WebSocket.

## Frontend

The frontend is built using EJS templates. The main views include:

- **Product List Page:** Displays all products with "Add to Cart" functionality.
- **Cart Page:** Shows items in the cart with options to modify quantities or remove items.

## Error Handling

The application includes error handling for common issues:

- **400 Bad Request:** Returned when the request is malformed or missing required parameters.
- **401 Unauthorized:** Returned when authentication is required but missing or invalid.
- **404 Not Found:** Returned when the requested resource does not exist.
- **500 Internal Server Error:** Returned for unexpected server errors.

Error responses include a JSON body with a message describing the error.

## Contact

For any questions or feedback, please contact [yatin.agrawal@nagarro.com](mailto:yatin.agrawal@nagarro.com).