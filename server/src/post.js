const express = require('express');
const router = express.Router();
const db = require('../src/connect');
const verifyToken = require('../src/verifyToken');

// Create post
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    await db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content]);
    res.json({ message: 'Post created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Read all posts
router.get('/', async (req, res) => {
  try {
    const posts = await db.query('SELECT * FROM posts');
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update post
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    await db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, req.params.id]);
    res.json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete post
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await db.query('DELETE FROM posts WHERE id = ?', [req.params.id]);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
