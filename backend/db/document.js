import mongoose from 'mongoose';

export default new mongoose.Schema({
  name: String,
  author: String,
  public: Boolean,
  markdown: String,
});