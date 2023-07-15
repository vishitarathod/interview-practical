import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
 title : {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  authInfo: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, //foreign key
    required: true,
    ref: 'User'
},
});

const Post = mongoose.model('Post', postSchema);

export default Post;