import React from 'react'

// steal a stolen version of github's markdown doc style:
const styleUrl = 'https://cdn.rawgit.com/sindresorhus/github-markdown-css/gh-pages/github-markdown.css'
const inlineStyle = '.markdown-body { box-sizing: border-box; min-width: 200px; max-width: 980px; margin: 0 auto; padding: 45px;}'

const Document = ({ pageTitle, children }) => (
  <html>
    <head>
      <meta charSet='utf-8' />
      <title>{pageTitle}</title>
      <link rel='stylesheet' href={styleUrl} />
      <style>
        {inlineStyle}
      </style>
    </head>
    <body className='markdown-body'>{children}</body>
  </html>
)

export default Document
