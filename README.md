# Sellit_Server

# Proyecto de Venta de Artículos Usados

Este proyecto de Venta de Artículos Usados es una aplicación web que permite a los usuarios comprar y vender artículos usados. Está compuesto por un frontend desarrollado en React y un backend que ofrece una API RESTful construida con Express y utiliza MongoDB/Mongoose para la gestión de datos.

## Repositorios

Este proyecto se divide en dos repositorios separados:

https://github.com/JulianCasillasP/Sellit_Client
https://github.com/JulianCasillasP/Sellit_Server

## Modelos

El proyecto utiliza dos modelos principales para gestionar los datos:

1. **Artículo**

const articleSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  condition: { type: String, required: true },
  seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});


2. **Usuario**

   const usuarioSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Orden' }],
  isAdmin: { type: Boolean, default: false },
});


## user roles

| Role  | Capabilities                                           | Property        |
|-------|-------------------------------------------------------|-----------------|
| User  | Can login/logout. Can read all the projects. Can create a new order. | isAdmin: false |
| Admin | Can login/logout. Can read, edit, or delete all the projects. Can create a new project. Can read all user's orders and edit or delete them. | isAdmin: true  |

## API Reference

La API ofrece los siguientes endpoints y métodos:

| Method | Endpoint                 | Requires                         | Response (200)          | Action                      |
|--------|--------------------------|----------------------------------|--------------------------|-----------------------------|
| GET    | `/articles`              | User authentication (user)        | List of articles         | Get list of articles        |
| GET    | `/articles/:id`          | User authentication (user)        | Article details          | Get details of an article   |
| POST   | `/articles`              | User authentication (user)        | New article created      | Create a new article        |
| PUT    | `/articles/:id`          | User authentication (user)        | Updated article          | Update an article           |
| DELETE | `/articles/:id`          | User authentication (user)        | Article deleted          | Delete an article           |
| GET    | `/users`                 | Admin authentication (admin)      | List of users            | Get list of users           |
| GET    | `/users/:id`             | Admin authentication (admin)      | User details             | Get details of a user       |
| POST   | `/users/signup`          | -                                | User registered          | Register as a new user      |
| POST   | `/users/login`           | -                                | Authentication successful | Log in                      |
| POST   | `/users/logout`          | User authentication (user)        | Logout successful        | Log out                     |
| PUT    | `/users/:id`             | Admin authentication (admin)      | User updated             | Update a user                |
| DELETE | `/users/:id`             | Admin authentication (admin)      | User deleted             | Delete a user                |



