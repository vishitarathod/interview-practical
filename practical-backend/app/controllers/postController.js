import User from "../models/user.js";
import Post from "../models/post.js";

class PostController {
  getAllPost = async (req, res) => {
    try {
      const { userId } = req.userId;

      const isUser = await User.findOne({ id: userId });
      if (!isUser) {
        return res.status(404).json({ message: "User Not Found" });
      }
      const posts = await Post.find({ userId });
      res.status(200).json(posts);
    } catch (e) {
      res.status(500).json(e);
    }
  };

  addPost = async (req, res) => {
    try {
      const { userId } = req.userId;
      const { title, content, authInfo } = req.body;

      const isUser = await User.findOne({ id: userId });
      if (!isUser) {
        return res.status(404).json({ message: "User Not Found" });
      }
      const newPost = new Post({
        title,
        content,
        authInfo,
        userId
      });
      await newPost.save();
      res.status(200).json("Post added sucessfully");
    } catch (e) {
      res.status(500).json(e);
    }
  };
}

export default new PostController();
