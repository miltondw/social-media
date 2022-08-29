<<<<<<< HEAD
const { AuthenticationError, UserInputError } = require("apollo-server")
=======
const { AuthenticationError } = require("apollo-server")
>>>>>>> f201d2553025f1e72d7811d49b1f7a27817284b3
const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth")
module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 })
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId)
        if (!post) {
          throw new Error('Post not found');
        }
        return post
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context)
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username
      })
      const post = await newPost.save()
      return post
    },
    async deletePost(_, { postId }, context) {
<<<<<<< HEAD
      const { username } = checkAuth(context)
      try {
        const post = await Post.findById(postId)
        if (username === post.username) {
          await post.delete()
          return 'Post deleted successfully'
        } else throw new AuthenticationError(error)
      } catch (error) {
        throw new Error(error)
      }
    },
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context)
      const post = await Post.findById(postId)
      if (post) {
        if (post.likes.find(like => like.username === username)) {
          post.likes = post.likes.filter(like => like.username !== username)
        } else {
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          })
        }
        await post.save()
        return post
      } else throw new UserInputError('Post not found')
=======
      const user = checkAuth(context)
      try {
        const post = await Post.findById(postId)
        if (user.username === post.username) {
          await post.delete()
          return 'Post deleted successfully'
        } else {
          throw new AuthenticationError(error)
        }
      } catch (error) {
        throw new Error(error)
      }
>>>>>>> f201d2553025f1e72d7811d49b1f7a27817284b3
    }
  }
};
