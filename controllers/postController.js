const Post = require('../models/Post');
const User = require('../models/User');

// Create a post
exports.createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await Post.create({
      title,
      content,
      authorId: req.user.id
    });
    res.json(post);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: { model: User, attributes: ['username'] }
    });
    res.json(posts);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  const { title, content } = req.body;

  try {
    let post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    if (post.authorId !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });

    post.title = title;
    post.content = content;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    if (post.authorId !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });

    await post.destroy();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
