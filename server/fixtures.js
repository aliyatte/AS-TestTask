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

  const [user, admin] = await User.create({
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

  await Article.create({
    title: 'Silver century',
    user: user,
    category: poetry,
    description: 'Silver century of Russian literature',
    image: 'fixtures/silver_century.jpg',
  }, {
    title: 'Deep learning',
    user: admin,
    category: science,
    description: 'Data science',
    image: 'fixtures/deep_learning',
  }, {
    title: 'Last supper by Leonardo da Vinci',
    user: admin,
    category: art,
    description: 'Secrets of the "Last supper',
    image: 'fixtures/last_supper.jpg',
  });

  mongoose.connection.close();
};

run().catch(e => {
  mongoose.connection.close();
  throw e;
});