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

const PostPage = ({ frontMatter: { title, date }, mdxSource, chapters }) => {
  return (
    <div>
      <h1>{title}</h1>

      <h1>Sommario</h1>
      {chapters.map((c, index) => (
        <p className={c.className} key={index}>{c.text} tutto</p>
      ))}

      <br />
      <MDXRemote {...mdxSource} components={components} />

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
  // lettura file markdown
  const markdownWithMeta = fs.readFileSync(path.join('posts',
    post + '.mdx'), 'utf-8')
  // estrazionefront matter
  const { data: frontMatter, content } = matter(markdownWithMeta)
  // estrazione h2 h3 per sommario expe ^ inizio \s* no spazi #{2} 2 cancelletti .* tutta la riga /gm tutte le occorrenze su più righe
  let chapters = content.match(/^\s*#{2}.*/gm).map(c => c.replace(/\n/g, ''));
  if (chapters) {
    chapters = chapters.reduce((acc, cap) => {
      let newCap = textToChapter(cap, /^\s*##\s+/, 'summary2');
      if (!newCap) {
        newCap = textToChapter(cap, /^\s*###\s+/, 'summary3');
        if (!newCap) {
          return acc;
        }
      }
      return [...acc, newCap];
    }, []);
  }
  const mdxSource = await serialize(content)

  return {
    props: {
      frontMatter,
      post,
      chapters,
      mdxSource
    }
  }
}

function textToChapter(cap, expr, className) {

  if (cap.match(expr)) {
    return {
      text: cap.replace(expr, ''),
      className
    }
  }
}

export { getStaticProps, getStaticPaths }
export default PostPage
