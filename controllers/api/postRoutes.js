const router = require('express').Router();
const { Post,Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/',async (req, res) => {
  // find all Posts
  
try{
    const PostData = await Post.findAll({
      include: [{model:Comment}],
  });
  res.status(200).json(PostData);
}catch(err){
  res.status(500).json(err);
}
});

router.get('/:id',async (req, res) => {
  // find one Post by its `id` value

 try{
    const PostData = await Post.findByPk(req.params.id, {
      include: [{model:Comment}],
 });
 if(!PostData){
  res.status(404).json({message:'Post not found with the id'});
  return;
 }
 res.status(200).json(PostData);
} catch (err) {
  res.status(500).json(err);
}
});

router.put('/:id',async (req, res) => {
  
  const newData = {
    title: req.body.title,
    body:req.body.body
  }
   try {
    const PostData = await Post.update(newData, {
      where: {
        id: req.params.id,
      },
    });
    
    res.status(200).json(PostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      description: req.body.description,
      articleBody:req.body.articleBody,  
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;










