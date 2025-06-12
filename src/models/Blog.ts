import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String }, // Add this line to store the image path
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Blog', blogSchema);
