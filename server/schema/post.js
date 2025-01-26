const {Schema,model} = require('mongoose');

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Post title is required'], // Added a custom error message
      trim: true, // Removes leading/trailing whitespaces
    },
    content: {
      type: String,
      required: [true, 'Post content is required'], // Added a custom error message
      trim: true, // Removes leading/trailing whitespaces
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'], // Added a custom error message
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    versionKey: false, // Removes __v field
  },
);
const Post = model('Post', postSchema);

module.exports = Post;
