const axios = require('axios');

const WP_API_BASE = 'https://iecs.vn/wp-json/wp/v2/posts';

exports.getAll = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await axios.get(`${WP_API_BASE}?per_page=15&page=${page}&_embed`);

    const posts = response.data.map(post => ({
      id: post.id,
      slug: post.slug,
      title: post.title.rendered,
      excerpt: post.excerpt.rendered,
      date: post.date,
      link: post.link,
      imageUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    }));

    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const response = await axios.get(`${WP_API_BASE}?slug=${slug}`);
    const posts = response.data;
    if (posts.length === 0) {
      return res.status(404).json({ error: 'Not found' });
    }
    const post = posts[0];
    res.json({
      id: post.id,
      slug: post.slug,
      title: post.title.rendered,
      content: post.content.rendered,
      date: post.date,
      link: post.link
    });
  } catch (error) {
    console.error('Error fetching post by slug:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Placeholder methods for other routes (not used in proxy)
exports.create = async (req, res) => {
  res.status(501).json({ message: 'Not implemented' });
};

exports.update = async (req, res) => {
  res.status(501).json({ message: 'Not implemented' });
};

exports.delete = async (req, res) => {
  res.status(501).json({ message: 'Not implemented' });
};
