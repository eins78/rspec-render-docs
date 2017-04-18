import React from 'react'
import url from 'url'

import Document from './Document'
import Highlighter from './Highlighter'
import TableOfContents from './TableOfContents'
import Chapters from './Chapters'

const RspecStory = ({ chapters, config }) => {
  const {
    pageTitle,
    versionLinkPath,
    sourceCodeUrlPath,
    showUselessSteps,
    gitCommit,
    gitTree,
    summary
  } = config
  const gitRef = gitCommit || 'master'
  const versionLink = gitTree && url.resolve(versionLinkPath, `./${gitTree}`)
  const sourceCodeLink = url.resolve(
    sourceCodeUrlPath + './blob/' + gitRef + '/',
    '.'
  )

  const header = (
    <header>
      <h1>
        {pageTitle + ' '}
        {versionLink && (
          <small style={{ float: 'right' }}>
            <span style={{ top: '0.25em', position: 'relative' }}>
              🌴
            </span>
            <a href={versionLink}><code>{gitTree.slice(0, 8)}</code></a>
          </small>
        )}
      </h1>
      <p>generated from RSpec test output</p>
    </header>
  )

  const overview = (
    <section>
      <h2>Overview</h2>
      <p>
        Examples:{' '}
        <b>{summary.example_count}</b>{' '}
        <Highlighter mark={summary.pending_count > 0}>
          ({summary.pending_count} pending)
        </Highlighter>
        <br />
        Sections: {chapters.map(([ title ]) => title).join('; ')}
      </p>
      <aside id='TableOfContents'>
        {TableOfContents(chapters)}
      </aside>
    </section>
  )

  return (
    <Document>
      {header}
      {overview}
      <hr />
      {Chapters({ chapters, sourceCodeLink, showUselessSteps })}
    </Document>
  )
}

export default RspecStory
