#!/usr/bin/env node
import fs from 'fs'
import url from 'url'
import React from 'react'
import f from 'active-lodash'
import { renderToStaticMarkup as renderReact } from 'react-dom/server'
import SyntaxHighlighter from 'react-syntax-highlighter'
import ReactMarkdown from 'react-markdown'
import { githubGist } from 'react-syntax-highlighter/dist/styles'
const slugify = (str) => f.kebabCase(f.deburr(str))
process.on('uncaughtException', (e) => { console.error('Error!', e); process.exit(1) })

const pageTitle = 'Madek Features'
const versionLinkPath = 'https://ci.zhdk.ch/cider-ci/ui/workspace/trees/'
const sourceCodeUrlPath = 'https://github.com/Madek/madek-webapp/'
const showUselessSteps = true // show 1 line of step - title will be the same (currently all)

const rspecData = JSON.parse(fs.readFileSync(process.argv[2]))
if (!f.present(f.get(rspecData, 'examples'))) throw new Error('No Data!')

// NOTE: only supports 2 levels of nesting, so need to get full_description from example_group (but still only 1. line - title!)
const chapters = f(rspecData.examples)
  // TODO: .map((e) => f.merge(e, {slug: slugify()})) …
  .sortBy((ex) => f.get(ex, 'example_group.scoped_id'))
  .groupBy((ex) => f.first(f.get(ex, 'example_group.full_description').split('\n')))
  .pairs()
  .sortBy(([key]) => (key || '').toLowerCase()) // ascii order, but ignore case
  .groupBy(([key]) => f.first(key.split(':')).trim())
  .pairs()
  .value()

const RspecStory = (rspecData) => {
  const gitCommit = rspecData.git_commit
  const gitTree = rspecData.git_tree
  const gitRef = gitCommit || 'master'
  const versionLink = gitTree && url.resolve(versionLinkPath, `./${gitTree}`)
  const sourceCodeLink = url.resolve(sourceCodeUrlPath + './blob/' + gitRef + '/', '.')

  const Document = ({children}) => (
    <html>
      <head>
        <meta charSet='utf-8' />
        <title>{pageTitle}</title>
        {/* steal a stolen version of github's markdown doc style: */}
        <link rel='stylesheet' href='https://cdn.rawgit.com/sindresorhus/github-markdown-css/gh-pages/github-markdown.css' />
        <style>{'.markdown-body { box-sizing: border-box; min-width: 200px; max-width: 980px; margin: 0 auto; padding: 45px;}'}</style>
      </head>
      <body className='markdown-body'>{children}</body>
    </html>
  )

  const CodeBlock = ({l, children}) => (
    <SyntaxHighlighter language={l} style={githubGist}
      customStyle={{background: null}} children={children || ''} />
  )

  // inline-only markdown
  const Md = ({children}) => (
    <ReactMarkdown source={children} escapeHtml
      unwrapDisallowed allowedTypes={['Text', 'Strong', 'Emph', 'Code']} />
  )

  // document-internal link from text, self-links when isHeading
  const NavLink = ({text, isHeading, children}) => {
    const slug = slugify(text || children)
    return <a href={'#' + slug} id={isHeading ? slug : null}>{children}</a>
  }

  const TableOfContents = (chapters) => (
    <ul>
      {f.map(chapters, ([title, sections]) => [
        <li><NavLink text={title}><Md>{title}</Md></NavLink></li>,
        <ul>
          {f.map(sections, ([title, examples]) => [
            <li><NavLink text={title}><Md>{title}</Md></NavLink></li>,
            <ul>
              {f.map(examples, (example, n) => (
                <li key={title + example.description + n}>
                  <NavLink text={`${title}-${example.description}`}>
                    <Md>{example.description}</Md>
                  </NavLink>
                </li>
              ))}
            </ul>
          ])}
        </ul>
      ])}
    </ul>
  )

  const ExampleSection = ({title, example}) => {
    const {description, file_path, source} = example
    const [lineNumber, sourceBlock] = [example.line_number, example.source_block]
    const fileName = f.present(file_path) &&
      file_path.replace(/^\.\//, '') +
      (lineNumber ? ':' + lineNumber : '')

    const githubLink = fileName && f.isNumber(lineNumber) &&
      url.resolve(sourceCodeLink, file_path) +
      (lineNumber ? '#L' + lineNumber : '')

    const lines = description.split('\n')
    const steps = lines.slice(1).join('\n')
    const showSteps = steps || showUselessSteps

    return (<div>
      {showSteps && <h6>Steps</h6>}
      {showSteps && <ReactMarkdown source={steps || description} />}
      <h6>
        {'Source '}
        {fileName && <a href={githubLink} style={{float: 'right'}}><kbd>{fileName}</kbd></a>}
      </h6>
      <CodeBlock l='ruby'>{sourceBlock}</CodeBlock>
      <div className='hook-debug' style={{display: 'none'}}>
        <pre><code>{source}</code></pre>
        <CodeBlock l='json'>{JSON.stringify(example, 0, 2)}</CodeBlock>
      </div>
    </div>)
  }

  const Chapters = (chapters) => (
    <article>
      {f.map(chapters, ([title, sections]) =>
        <section key={title}>
          <h2 style={{display: 'none'}}><NavLink text={title}><Md>{title}</Md></NavLink></h2>

          {f.map(sections, ([title, examples], index) => [
            <h3><NavLink isHeading text={title}><Md>{title}</Md></NavLink></h3>,
            f.map(examples, (example) => [
              <h4>
                <NavLink isHeading text={`${title}-${example.description}`}>
                  <Md>{example.description}</Md>
                </NavLink>
              </h4>,
              ExampleSection({title, example}),
              ((index < sections.length) && <hr />)
            ])
          ])}
        </section>
      )}
    </article>
  )

  return (<Document>
    <h1>
      {pageTitle + ' '}
      {versionLink &&
        <small style={{float: 'right'}}>
          <span style={{top: '0.25em', position: 'relative'}}>🌴 </span>
          <a href={versionLink}><code>{gitTree.slice(0, 8)}</code></a></small>
      }
    </h1>
    <p>generated from RSpec test output</p>
    <h2>Overview</h2>
    {TableOfContents(chapters)}
    <hr />
    {Chapters(chapters)}
  </Document>)
}

process.stdout.write('<!DOCTYPE html>' + renderReact(RspecStory(rspecData)))
