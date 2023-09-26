const express = require('express');
const router = express.Router();
const Article = require('../models/Article.model');
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// CREATE ARTICLE
router.post("/add", isAuthenticated, (req, res, next) => {
  const { title, description, price, condition, category } = req.body;

  Article.create({ title, description, price, condition, category })
    .then((article) => {
      res.json(article);
    })
    .catch((err) => res.json(err));
});

// READ ARTICLES
router.get("/",  (req, res, next) => {
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
router.put("/:articleId", isAuthenticated, (req, res, next) => {
  const { articleId } = req.params;

  Article.findByIdAndUpdate(articleId, req.body, { new: true })
    .then((updatedArticle) => {
      res.json(updatedArticle);
    })
    .catch((err) => res.json(err));
});

// DELETE ARTICLE
router.delete("/:articleId", isAuthenticated, (req, res, next) => {
  const { articleId } = req.params;

  Article.findByIdAndRemove(articleId)
    .then(() => {
      res.json({ message: "Se ha eliminado el artículo correctamente." });
    })
    .catch((err) => res.json(err));
});

module.exports = router;
