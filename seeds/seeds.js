const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const CommentData = require('./CommentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = [];

  for (const post of postData) {
   const newPost = await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    posts.push(newPost);
  }

  for (const comment of CommentData) {
     await Comment.create({
       ...comment,
       post_id: users[Math.floor(Math.random() * users.length)].id,
     });
     
   }
  console.log('-----seeding db---');
  process.exit(0);
};

seedDatabase();