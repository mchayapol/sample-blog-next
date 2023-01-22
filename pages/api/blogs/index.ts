// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { models, connect } from 'mongoose';
import { env } from 'process'
import Blog from '../../../db/models/blog';


export async function getBlogs() {
  // console.debug(`axios.get ${process.env.NEXT_PUBLIC_API_URL}/blogs`)
  // const { data: blogs } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs`)
  const { data: blogs } = await axios.get(`/api/blogs`)
  // console.debug('getBlogs', blogs)
  return blogs
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // console.log(req.method)
  // console.log(models)
  // console.log(Blog)

  try {

    connect(env.MONGODB_URI);

    if (req.method == 'GET') {
      const blogs = await Blog.find()
      res.status(200).send(blogs);

    } else {
      res.status(400).json({ message: 'Method not supported' })
    }
  } catch (error) {
    console.error(err);
    res.status(500).send(err);

  }
}
