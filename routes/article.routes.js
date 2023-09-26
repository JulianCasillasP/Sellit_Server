const express = require('express');
const router = express.Router();
const Article = require('../models/Article.model');



// CREATE ARTICLE
router.post("/add", (req, res, next) => {
  const { name, description, price, condition, category } = req.body;

  const newArticle = new Article({
    name,
    description,
    price,
    condition,
    category
  });

  newArticle
    .save()
    .then((article) => {
      res.status(201).json(article);
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ error: 'Error al crear un nuevo artículo' });
    });
});

// READ ARTICLES
router.get("/", (req, res, next) => {
  Article.find()
    .then((articles) => {
      res.json(articles);
    })
    .catch((err) => res.json(err));
});

router.get("/:articleId", (req, res, next) => {
  const { articleId } = req.params;

  Article.findById(articleId)
    .then((article) => {
      res.json(article);
    })
    .catch((err) => res.json(err));
});

// UPDATE ARTICLE
router.put("/:articleId", (req, res, next) => {
  const { articleId } = req.params;

  Article.findByIdAndUpdate(articleId, req.body, { new: true })
    .then((updatedArticle) => {
      res.json(updatedArticle);
    })
    .catch((err) => res.json(err));
});

// DELETE ARTICLE
router.delete("/:articleId", (req, res, next) => {
  const { articleId } = req.params;

  Article.findByIdAndRemove(articleId)
    .then(() => {
      res.json({ message: "Se ha eliminado el artículo correctamente." });
    })
    .catch((err) => res.json(err));
});

module.exports = router;