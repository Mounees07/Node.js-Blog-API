const express = require('express');
const router = express.Router();
const { createPost, getPosts, updatePost, deletePost } = require('../controllers/postController');
const auth = require('../middleware/auth');  // Middleware for JWT authentication

router.post('/', auth, createPost);
router.get('/', getPosts);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;
