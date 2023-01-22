// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { models, connect } from 'mongoose';
import { env } from 'process'
import Blog, { IBlog } from '../../../db/models/blog';


export async function getBlog(id: string) {
  const { data: blog } = await axios.get(`/api/blog/${id}`)
  return blog
}

export async function getBlogs() {
  const { data: blogs } = await axios.get(`/api/blogs`)
  return blogs
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IBlog[] |IBlog | Error>
) {
  console.log("req.method", req.method)
  // console.log(models)
  // console.log(Blog)

  try {
    if (!env.MONGODB_URI) throw new Error("MONGODB_URI is not defined");
    connect(env.MONGODB_URI);

    if (req.method == 'GET') {
      // List all blogs
      const blogs = await Blog.find()
      res.status(200).send(blogs);

    } else if (req.method == 'POST') {
      // Create a new blog
      const newBlog = new Blog(req.body);
      newBlog.save();
      console.log("New Blog", newBlog);
      res.status(200).send(newBlog);

    } else if (req.method == 'PUT') {
      // Update a blog
      const updatedBlog = await Blog.findByIdAndUpdate(req.body._id, req.body);
      console.log("Updated Blog", updatedBlog);
      res.status(200).send(updatedBlog);

    } else {
      res.status(400).send(new Error('Method not supported'))
    }
  } catch (e) {
    console.error(e);
    if (typeof e === "string") {
      e.toUpperCase() // works, `e` narrowed to string
      res.status(500).send(new Error(e));
    } else if (e instanceof Error) {
      res.status(500).send(new Error(e.message));
    } else {
      res.status(500).send(new Error("Internal Server Error"));
    }
  }
}
