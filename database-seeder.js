/* eslint-disable @typescript-eslint/no-var-requires */
const faker = require('faker');
const bcrypt = require('bcrypt');

const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
});

async function seed() {
  const auth = {
    userId: 1,
    accessToken: "1f7ead5f-36c2-4d24-b9b0-0fc3abfb3c14"
  }

  const users = [...Array(12)].map((v, index) => {
    const itemId = index + 1;
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.firstName(),
      email: `user${itemId}@example.com`,
      password: bcrypt.hashSync(`passW0rd${itemId}`, 10),
      isAdmin: Boolean(itemId === 1),
    };
  });

  const products = [...Array(24)].map((v, index) => {
    const itemId = index + 1;
    return {
      name: `Product${itemId}`,
      description: faker.lorem.sentence(),
      image: faker.image.imageUrl(640, 640),
      categoryId: Math.floor(Math.random() * 6) + 1,
      published: true,
    };
  });

  const categories = [...Array(12)].map((v, index) => {
    const itemId = index + 1;
    return {
      name: `Category${itemId}`,
      description: faker.lorem.sentence(),
      published: true,
    };
  });

  await knex('users').insert(users);
  await knex('categories').insert(categories);
  await knex('auth').insert(auth);
  await knex('products').insert(products);
}

seed().then(() => {
  console.log('SEEDING COMPLETE')
}).finally(() => {
  process.exit();
});
