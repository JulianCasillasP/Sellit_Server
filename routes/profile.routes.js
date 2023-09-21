const router = require("express").Router();
const User = require("../models/User.model"); 
const Article = require("../models/Article.model"); 

// Ruta para ver el perfil de un usuario por su ID
router.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Encuentra al usuario por su ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Encuentra los artículos publicados por ese usuario
    const articles = await Article.find({ seller: userId });

    // Retorna la información del perfil del usuario
    res.json({
      username: user.username,
      email: user.email,
      articles: articles,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener el perfil del usuario." });
  }
});

module.exports = router;