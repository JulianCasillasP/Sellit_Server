const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const saltRounds = 10;

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ["jpg", "png", "gif"],
    folder: "profiles" // Ruta de almacenamiento en Cloudinary para imágenes de perfil
  }
});

const upload = multer({ storage });

// POST /auth/signup  - Crea un nuevo usuario en la base de datos
router.post("/signup", upload.single("profileImage"), (req, res, next) => {
  const { email, password, username, adminPassword } = req.body;
  const profileImage = req.file.path; // Obtenemos la URL de la imagen de Cloudinary

  // Comprueba si el correo electrónico, la contraseña o el nombre de usuario se proporcionan como cadenas vacías
  if (email === "" || password === "" || username === "") {
    res.status(400).json({ message: "Provide email, password, and username" });
    return;
  }

  // Comprueba si el correo electrónico tiene un formato válido
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  // Comprueba la contraseña en busca de caracteres especiales y longitud mínima
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Comprueba si la contraseña de administrador es correcta
      if (adminPassword === "4444") {
        // Si la contraseña de administrador es correcta, establece isAdmin en true
        const isAdmin = true;

        User.create({ email, password: hashedPassword, username, isAdmin, profileImage })
          .then((createdUser) => {
            // Descompone el objeto de usuario recién creado para omitir la contraseña
            const { email, username, _id } = createdUser;

            // Crea un nuevo objeto que no expone la contraseña
            const user = { email, username, _id, profileImage };

            // Envía una respuesta JSON que contiene el objeto de usuario
            res.status(201).json({ user: user });
          })
          .catch((err) => next(err));
      } else {
        // Si la contraseña de administrador no es correcta, el usuario no se registra como administrador
        User.create({ email, password: hashedPassword, username, profileImage })
          .then((createdUser) => {
            // Descompone el objeto de usuario recién creado para omitir la contraseña
            const { email, username, _id } = createdUser;

            // Crea un nuevo objeto que no expone la contraseña
            const user = { email, username, _id, profileImage };

            // Envía una respuesta JSON que contiene el objeto de usuario
            res.status(201).json({ user: user });
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
});

// POST  /auth/login - Verifica el correo electrónico y la contraseña y devuelve un JWT
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  // Comprueba si el correo electrónico o la contraseña se proporcionan como cadenas vacías
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        // Si el usuario no se encuentra, envía una respuesta de error
        res.status(401).json({ message: "User not found." });
        return;
      }

      // Compara la contraseña proporcionada con la almacenada en la base de datos
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Descompone el objeto de usuario para omitir la contraseña
        const { _id, email, username, profileImage, isAdmin } = foundUser;

        // Crea un objeto que se establecerá como el payload del token
        const payload = { _id, email, username, profileImage, isAdmin };

        // Crea un token JSON Web y lo firma
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        // Envía el token como respuesta
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => next(err));
});

router.post("/logout", isAuthenticated, (req, res, next) => {
  res.status(200).json({ message: "Logout successful" });
});

// GET  /auth/verify  -  Se utiliza para verificar el JWT almacenado en el cliente
router.get("/verify", isAuthenticated, (req, res, next) => {
  // Si el token JWT es válido, el payload se descodifica mediante el middleware isAuthenticated y se pone a disposición en `req.payload`
  res.status(200).json(req.payload);
});

module.exports = router;
