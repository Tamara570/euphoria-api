const BlogService = {
    getAllBlogs(db) {
      return db
        .from('blog')
        .select('*')
    },

    getBlogsById(db, blog_id) {
      console.log("blog_id", blog_id)
      return db
        .from('blog')
        .select('*')
        .where({
          id: blog_id
        })
        .first()
    },

    insertBlogs(db, newBlog) {
      return db
        .insert(newBlog)
        .into('blog')
        .returning('*')
        .then(rows => {
          return rows[0];
        });
    },
  
    deleteBlogById(db, blog_id) {
      return db('blog')
        .where({
          id: blog_id
        })
        .delete()
    },
  
    updateBlogById(db, blog_id, newBlog) {
      console.log(blog_id, newBlog,"hi")
      return db('blog')
        .update(newBlog, returning = true)
        .where({
          id: blog_id
        })
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
  
  }
  module.exports = BlogService;