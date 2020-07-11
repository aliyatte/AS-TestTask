const mongoose = require('mongoose');
const config = require('./config');
const Category = require('./models/Category');
const User = require('./models/User');
const {nanoid} = require("nanoid");

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (let coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  await User.create({
    username: 'user',
    password: '123',
    token: nanoid(),
  }, {
    username: 'admin',
    password: '123',
    role: 'admin',
    token: nanoid(),
  });

  const [art, poetry, science] = await Category.create({
    title: 'Art',
    parent: null,
  }, {
    title: 'Poetry',
    parent: null,
  }, {
    title: 'Science',
    parent: null,
  });
  //
  // await Product.create({
  //   title: 'Intel Core i7',
  //   price: 400,
  //   category: cpus,
  //   image: 'fixtures/cpu.jpg'
  // }, {
  //   title: 'Seagate Barracuda 2TB',
  //   price: 70,
  //   category: hdds,
  //   image: 'fixtures/hdd.jpg'
  // }, {
  //   title: 'ASUS Geforce RTX 2080Ti',
  //   price: 1000,
  //   category: gpus,
  //   image: 'fixtures/gpu.jpg'
  // });

  mongoose.connection.close();
};

run().catch(e => {
  mongoose.connection.close();
  throw e;
});