import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Button from '../../components/button'
import CodeView from '../../components/code-view'

// import { Nav, Button } from '../../components'
//const components = { Nav, Button, SyntaxHighlighter }
const components = { Button, CodeView }

const PostPage = ({ frontMatter: { title, date }, mdxSource }) => {
  return (
    <div>
      <h1>{title}</h1>
      <MDXRemote {...mdxSource} components={components}/>
    </div>
  )
}

const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map(filename => ({
    params: {
      post: filename.replace('.mdx', '')
    }
  }))

  return {
    paths,
    fallback: false
  }
}

const getStaticProps = async ({ params: { post } }) => {
  const markdownWithMeta = fs.readFileSync(path.join('posts',
    post + '.mdx'), 'utf-8')

  const { data: frontMatter, content } = matter(markdownWithMeta)
  const mdxSource = await serialize(content)

  return {
    props: {
      frontMatter,
      post,
      mdxSource
    }
  }
}

export { getStaticProps, getStaticPaths }
export default PostPage
