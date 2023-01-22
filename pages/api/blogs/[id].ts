// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'mongoose';
import { env } from 'process'
import Blog, { IBlog } from '../../../db/models/blog';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IBlog | Error>
) {

  try {
    if (!env.MONGODB_URI) throw new Error("MONGODB_URI is not defined");
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
