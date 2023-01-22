import { Schema, models, model } from 'mongoose';

interface IBlog {
  topic: string;
  content: string;
  author: string;
}

const blogSchema = new Schema<IBlog>({
  topic: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
});

const Blog = models?.Blog || model<IBlog>("Blog", blogSchema);
export default Blog
