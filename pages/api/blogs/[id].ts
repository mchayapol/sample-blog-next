// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { models, connect } from 'mongoose';
import { env } from 'process'
import Blog from '../../../db/models/blog';




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  try {
    connect(env.MONGODB_URI);
    const { id } = req.query

    if (req.method == 'GET') {
      // Get a blog
      const blog = await Blog.findById(id)
      res.status(200).send(blog);

    } else if (req.method == 'DELETE') {
      // Delete a blog.
      // It has to be here because DELETE does not have a body (payload).
      const deletedBlog = await Blog.findByIdAndRemove(id);
      console.log("Deleted Blog", deletedBlog)
      res.status(200).send(deletedBlog);

    } else {
      res.status(400).json({ message: 'Method not supported' })
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);

  }
}
