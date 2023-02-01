const router = require('express').Router();
const { User,Post,Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/',async (req, res) => {
  // find all Comments
  
try{
    const CommentData = await Comment.findAll({
     // include: [{model:Post},{model:User}],
  });

  res.status(200).json(CommentData);
}catch(err){
  res.status(500).json(err);
}
});

router.get('/:id',async (req, res) => {
  // find one Comment by its `id` value

 try{
    const CommentData = await Comment.findByPk(req.params.id, {
      //include: [{model:Post},{model:User}],
 });

 console.log(CommentData);
 
 if(!CommentData){
  res.status(404).json({message:'No comments for this post yet.'});
  return;
 }
 res.status(200).json(CommentData);
} catch (err) {
  res.status(500).json(err);
}
});



router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);

  console.log("New Comment created",newComment);

  } catch (err) {
    res.status(400).json(err);
  }
});



module.exports = router;

