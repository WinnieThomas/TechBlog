const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
//const editRoutes = require('./editRoute');

router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/comments', commentRoutes);
///router.use('/edit', editRoutes);

module.exports = router;
