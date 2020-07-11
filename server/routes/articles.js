const express = require('express');

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const upload = require('../multer').uploads;

const Article = require('../models/Article');

const router = express.Router();

//getting articles

router.get('/', async (req, res) => {
  let dbQuery = {};

  if (req.query.category) {
    dbQuery.category = req.query.category;
  }

  try {
    const articles = await Article.find(dbQuery).populate('category');
    return res.send(articles);
  } catch (error) {
    return res.send({error});
  }
});

//creating an article

router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const articleData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      user: req.user._id, //check
    };

    if (req.file) {
      articleData.image = req.file.filename;
    }

    const article = new Article(articleData);

    await article.save();

    return res.send({id: article._id});
  } catch (error) {
      return res.status(400).send(error);
  }
});

//getting an article by id

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Article.findById(id);
    return res.send(result);
  } catch (error) {
    return res.send({error});
  }
});

//deleting an article by id

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Article.findByIdAndDelete(id);
    return res.send(result);
  } catch (error) {
    return res.send({error});
  }
});

//updating an article by id

router.patch('/:id', [auth, permit('admin')], async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = {new: true};

    const result = await Article.findByIdAndUpdate(id, updates, options);
    return res.send(result);
  } catch (error) {
    return res.send({error});
  }
});

module.exports = router;