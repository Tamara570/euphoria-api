const path = require('path');
const express = require('express');
const xss = require('xss');
const blogService = require('./blog-service');

const blogRouter = express.Router();
const jsonParser = express.json();

const serializeBlog = (blog) => ({
  id: blog.id,
  title: xss(blog.title),
  username: xss(blog.username),
  content: xss(blog.content),
}); 


blogRouter
  .route('/')
  .get((req, res, next) => {
    blogService.getAllBlogs(req.app.get('db'))
      .then(blogs => {
          console.log('response', blogs)
        res.json(blogs);
      })
      .catch(next);
  })

  .post(jsonParser, (req, res, next) => {
    const {
      title,
      content,
      username,
    } = req.body;

    const newBlog = {
      title,
      content,
      username,
    };

    for (const [key, value] of Object.entries(newBlog))
      if (value == null)
        return res.status(400).json({
          error: {
            message: `Missing '${key}' in request body`,
          },
        });


    blogService.insertBlogs(req.app.get('db'), newBlog)
      .then(blog => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${blog.id}`))
          .json(blog);
      })
      .catch(next);
  });


blogRouter
  .route('/:blog_id')
  .all((req, res, next) => {
    const { blog_id } = req.params;
    blogService.getBlogsById(req.app.get('db'), blog_id)
      .then(blogs => {
        console.log(blogs,'post')
        if (!blogs) {
          return res.status(404).json({
            error: { message: `Blog doesn't exist` },
          });
        }
        res.blogs = blogs; // save the blog for the next middleware
        next(); // don't forget to call next so the next middleware happens!
      })
      .catch(next);
  })

  .get((req, res, next) => {
    res.json(
      serializeBlog(res.blogs));
  })

module.exports = blogRouter;