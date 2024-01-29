const addBlogPost = require("./add-blogPost");
const updateBlogPost = require("./update-blogPost");
const getAllBlogPost = require("./getAll-blogPost");
const getBlogPostById = require("./get-blogPost-by-id");
const removeBlogPost = require("./remove-blogPost");
const addBlogPostMedia = require("./add-blogPost-media");
const updateBlogPostMedia = require("./update-blogPost-media");
const updateBlogPostStatus = require("./update-blogPost-status");

module.exports = exports = {
  addBlogPost,
  updateBlogPost,
  getAllBlogPost,
  getBlogPostById,
  removeBlogPost,
  addBlogPostMedia,
  updateBlogPostMedia,
  updateBlogPostStatus,
};
