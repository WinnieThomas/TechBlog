const router = require('express').Router();
const { Post, User ,Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    
    const postData = await Post.findAll({
      include: [
          {model: User},
          {model: Comment}
      ],
    });
    //console.log(postData);
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
  
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
             {model: User,
            },
            {
              model:Comment,
              include: 
                {
                model:User,
                attributes:['name'],
              },
          },
        ],
    });

    const post = postData.get({ plain: true });
   // console.log(post);
   console.log("the blog post by id",post);
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
   
  } catch (err) {
    res.status(404).json(err);
  }
});


// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id/edit', withAuth, async (req, res) => { 
  console.log("Edit request came");
  try {
    const postData = await Post.findByPk(req.params.id, {
       include: [
       { model: User,
       attributes: { exclude: ['password']}}
       ],
    });

    const post = postData.get({ plain: true });
    console.log(post);
    
    res.render('edit', {
      ...post,
      logged_in: req.session.logged_in,
      //isOwner: req.session.user_id === post.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
