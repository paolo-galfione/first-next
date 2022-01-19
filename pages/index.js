import Image from 'next/image'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function Home({ posts }) {
  return (
    <div>
      <h1>Paolo's Blog</h1>
      <ul>
        {posts.map((post, index) => (
          <li>
            <Link href={'/blog/' + post.route} passHref key={index}>
            { post.frontMatter.title }</Link>
          </li>
        ))}
      </ul>
    </div>
   
  )
}

export const getStaticProps = async () => {

  const files = fs.readdirSync(path.join('posts'));

  const posts = files.map( filename => {
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8');
    const { data: frontMatter } = matter(markdownWithMeta);

    return {
      frontMatter,
      route: filename.split('.')[0]
    }
  });

  return {
    props: {
      posts
    }
  }

}
