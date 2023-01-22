import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useQuery, dehydrate, QueryClient } from '@tanstack/react-query';
import { getBlogs } from './api/blogs';
// TODO this should go to @types
import { IBlog } from '../db/models/blog';

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const { data, isLoading } = useQuery(['blogs'], getBlogs);
  // console.debug('data', data)

  if (isLoading) return <>Loading</>

  // console.log('blogs', blogs)
  const blogList = data.map((blog:IBlog) => (
    <a
      key={blog._id}
      className={styles.card}
      href={`/api/blogs/${blog._id}`}
      rel="noopener noreferrer"
    >

      <h2 className={inter.className}>
        {blog.topic} <span>-&gt;</span>
      </h2>
      <p className={inter.className}>
        {blog.content}
      </p>
      <p style={{ fontSize: '.8rem', fontStyle: 'italic' }}>-- {blog.author}</p>
    </a>
  ))

  return (
    <>
      <Head>
        <title>Sample Blog using Next.js</title>
        <meta name="description" content="Sample Blog using Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Sample Blogs
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              For VMS.au
            </a>
          </div>
        </div>

        {/* <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div> */}

        <div className={styles.grid}>
          {blogList}
        </div>
      </main>
    </>
  )
}
async function getServerSideProps() {
  const queryClient = new QueryClient()

  // prefetch data on the server
  await queryClient.fetchQuery(['blogs'], getBlogs)
  console.log("HELLO?")
  return {
    props: {
      // dehydrate query cache
      dehydratedState: dehydrate(queryClient),
      // blogs: queryClient.getQueryData('blogs')
    },
  }

}