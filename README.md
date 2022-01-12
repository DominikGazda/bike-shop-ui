# Bike - shop 
#### Bike online shop application created by using Spring Boot in microservices architecture and React - UI. 
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#Features)
* [User Interface](#user-interface---example-views)

## General info
A web application that allows you to manage or place orders in an online store, depending on the administrator or customer role assigned to the user.

## Technologies
Project is created with:
* JavaScript
* React.js
* Redux
* Axios
* Formik

## Setup
To run this project, run it locally

1. Download or Clone project:
```
https://github.com/DominikGazda/bike-shop-ui
```
2. Open project in IDE (Visual Studio Code for example)
3. Open terminal and run command
```
npm start
```
## Features
* Register new account
* Log in to existing account
* Add, modify or delete products and orders in shop using an administator account
* Create new order using a user account
* Manage your account as user
* Manage all accounts as administrator
* Make an appointment at a bicycle repair shop

## User interface - example views
### Home page
* Path: /home
* Displays customer reviews, bicycle news and an advertising banner for the store
<img src = "https://github.com/DominikGazda/bike-shop-ui/blob/develop/images/home.png" />

### Product list page
* Path (depends on wchich category we choose): 
    - /parts,
    - /accessories,
    - /bikes,
    - /workshop 
* Displays product list
* Displays sidebar with filters
<img src = "https://github.com/DominikGazda/bike-shop-ui/blob/develop/images/parts.png" />

### Product details page
* Path (depends on wchich category we choose): 
    - /part/{product_name}, 
    - /accessories/{product_name},
    - /bikes/{product_name}, 
    - /workshop/{product_name} 
* Displays product details
<img src = "https://github.com/DominikGazda/bike-shop-ui/blob/develop/images/details.png" />

### Customer cart
* Path: modal window
* Displays all product that user ordered
* Counts total price of ordered items
<img src = "https://github.com/DominikGazda/bike-shop-ui/blob/develop/images/cart.png" />

### Order summary page
* Path: /order
* Displays details about product that user ordered
* Allows to choose the method of delivery
* Counts total price (with delivery price)
<img src = "https://github.com/DominikGazda/bike-shop-ui/blob/develop/images/order-summary.png" />

### Order address page
* Path: /order/client
* Allows to change ordering addres (default order address is taken from account details)
* Allows to choose the paying method
<img src = "https://github.com/DominikGazda/bike-shop-ui/blob/develop/images/order-details.png" />

### Registration page
* Path: /register
* Allows to create an user account
* The registration form is validate by using React.js library - Formik
<img src = "https://github.com/DominikGazda/bike-shop-ui/blob/develop/images/registration.png" />

### User account page
* Path: 
    - /account/information
    - /account/orders
    - /account/service
    - /account/options
    - /account/logout
* Allows to show user information and orders
* Allows to make an appointment in bike shop service
* Allows to change account details
* Allows to logout from an account
<img src = "https://github.com/DominikGazda/bike-shop-ui/blob/develop/images/user.png" />

### Admin account page
* Path: 
    - /account/adm/information
    - /account/adm/orders
    - /account/adm/orders/{id}
    - /account/adm/add/{product_category}
    - /account/adm/delete/{product_category}
    - /account/adm/modify/{product_category}
    - /account/adm/users
    - /account/adm/users/{id}
    - /logout
* Allows to show admin account information
* Allows to manage all orders in application
* Allows to add prodcut to the shop
* Allows to delete product from the shop
* Allows to modify product in the shop
* Allows to manage all accounts in application
<img src = "https://github.com/DominikGazda/bike-shop-ui/blob/develop/images/admin.png" />

