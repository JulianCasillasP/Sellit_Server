# Sellit_Server

# Proyecto de Venta de Artículos Usados

Este proyecto de Venta de Artículos Usados es una aplicación web que permite a los usuarios comprar y vender artículos usados. Está compuesto por un frontend desarrollado en React y un backend que ofrece una API RESTful construida con Express y utiliza MongoDB/Mongoose para la gestión de datos.

## Repositorios

Este proyecto se divide en dos repositorios separados:

 https://github.com/JulianCasillasP/Sellit_Client

 https://github.com/JulianCasillasP/Sellit_Server

## Modelos

El proyecto utiliza dos modelos principales para gestionar los datos:

1. **Article**
```js
const articleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  condition: {
    type: String,
    enum: ["new", "like new", "used"],
    required: true,
  },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  category: {
    type: String,
    enum: ["clothes", "shoes", "jewels", "electronics"],
    required: true,
  },
  image: [String],
});
```

2. **User**
```js
  const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  profileImage: { type: String }, 
  articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
});
```

## user roles

| Role  | Capabilities                                           | Property        |
|-------|-------------------------------------------------------|-----------------|
| User  | Can login/logout. Can read all the projects. Can create a new order. | isAdmin: false |
| Admin | Can login/logout. Can read, edit, or delete all the articles. Can create a new article. | isAdmin: true  |

## API Reference

La API ofrece los siguientes endpoints y métodos:

| Method | Endpoint                 | Requires                         | Response (200)          | Action                      |
|--------|--------------------------|----------------------------------|--------------------------|-----------------------------|
| GET    | `/article`              | User authentication (user)        | List of articles         | Get list of articles        |
| GET    | `/article/:id`          | User authentication (user)        | Article details          | Get details of an article   |
| POST   | `/article`              | User authentication (user)        | New article created      | Create a new article        |
| PUT    | `/article/:id`          | User authentication (user)        | Updated article          | Update an article           |
| DELETE | `/article/:id`          | User authentication (user)        | Article deleted          | Delete an article           |
| GET    | `/auth/profile`             | Admin authentication (admin)      | User details             | Get details of a user       |
| POST   | `/auth/signup`          | -                                | User registered          | Register as a new user      |
| POST   | `/auth/login`           | -                                | Authentication successful | Log in                      |
| POST   | `/auth/logout`          | User authentication (user)        | Logout successful        | Log out                     |

