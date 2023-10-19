# Sellit_Server

# Used Items Sales Project

This Used Items Sales project is a web application that allows users to buy and sell used items. It consists of a frontend developed in React and a backend that provides a RESTful API built with Express and uses MongoDB/Mongoose for data management.

## Repositories

This project is divided into two separate repositories:

[Frontend Repository](https://github.com/JulianCasillasP/Sellit_Client)

[Backend Repository](https://github.com/JulianCasillasP/Sellit_Server)

## Models

The project uses two main models to manage data:

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

## User roles

| Role  | Capabilities                                           | Property        |
|-------|-------------------------------------------------------|-----------------|
| User  | Can login/logout. Can read all the projects. Can create a new order. | isAdmin: false |
| Admin | Can login/logout. Can read, edit, or delete all the articles. Can create a new article. | isAdmin: true  |

## API Reference

The API provides the following endpoints and methods:

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

