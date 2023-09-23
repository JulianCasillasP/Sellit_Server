const router = require("express").Router();
const User = require("../models/User.model"); 
const { isAuthenticated} = require("../middleware/jwt.middleware.js")

// Ruta para obtener un perfil de usuario por su ID
router.get("/:id",  isAuthenticated, (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el perfil de usuario" });
    });
});


// Ruta para actualizar el perfil de usuario por su ID
router.put("/:id",  isAuthenticated, (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body; // Supongamos que el cuerpo de la solicitud contiene los nuevos datos del usuario

  User.findByIdAndUpdate(userId, updatedUserData, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json(updatedUser);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar el perfil de usuario" });
    });
});

module.exports = router;