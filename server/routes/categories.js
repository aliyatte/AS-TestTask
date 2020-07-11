const express = require('express');

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const Category = require('../models/Category');

const router = express.Router();

//getting categories

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().populate('parent');
    return res.send(categories);
  } catch (error) {
    return res.send({error});
  }
});

//creating a category

router.post('/', [auth, permit('admin')], async (req, res) => {
  let parent = req.body.parent ? req.body.parent : null;

  const category = new Category({
    title: req.body.title,
    parent,
  });

  await category.save();

  return res.status(201).send(category);
});

//getting a category by id

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Category.findById(id);
    return res.send(result);
  } catch (error) {
    return res.send({error});
  }
});

//deleting a category by id

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
  const id = req.params.id;

  try {
    await Category.findByIdAndDelete(id);
    return res.send("Successfully deleted");
  } catch (error) {
    return res.send({error});
  }
});

//updating a category by id

router.patch('/:id', [auth, permit('admin')], async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = {new: true};

    const result = await Category.findByIdAndUpdate(id, updates, options);
    return res.send(result);
  } catch (error) {
    return res.send({error});
  }
});

module.exports = router;