const express = require('express');
const bcrypt = require('bcrypt');

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const User = require('../models/User');

const router = express.Router();

//registration of a new user

router.post('/', async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  try {
    user.generateToken();
    await user.save();
    return res.send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});

//logging in

router.post('/sessions', async (req, res) => {
  const user = await User.findOne({username: req.body.username}).populate('customer');

  if (!user) {
    return res.status(400).send({error: 'Username or password not correct!'});
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) {
    return res.status(400).send({error: 'Username or password not correct!'});
  }

  user.generateToken();

  await user.save();

  return res.send(user);
});

//logging out

router.delete('/sessions', async (req, res) => {
  const success = {message: 'Success'};

  try {
    const token = req.get('Authorization').split(' ')[1];

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();
    await user.save();

    return res.send(success);
  } catch (error) {
    return res.send(success);
  }
});

//editing user settings - user

router.patch('/profile', auth, async (req, res) => {
  try {
    if (req.body.password) {
      req.user.password = req.body.password;
    }

    await req.user.save();
    return res.send(req.user);
  } catch (error) {
    return res.sendStatus(500);
  }
});

//getting a list of users - admin

router.get('/', async (req, res) => {
  const users = await User.find();
  return res.send(users);
});

// getting a user by id - admin

router.get('/:id', [auth, permit('admin')], async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (user) {
      return res.send(user);
    } else {
      return res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    return res.status(500).send({error});
  }
});

//editing user password -admin

router.patch('/:id', [auth, permit('admin')], async (req, res) =>{
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (user) {
      user.password = req.body.password;
      await user.save();
      return res.send(user);
    } else {
      return res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    return res.status(500).send({error});
  }
});

// deleting a user - admin

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndRemove(id);
    res.status(200).send({ message: 'Successfully deleted user' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;