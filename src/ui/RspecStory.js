import React from 'react'
import url from 'url'

import Document from './Document'
import TableOfContents from './TableOfContents'
import Chapters from './Chapters'

const RspecStory = ({ chapters, config }) => {
  const {
    pageTitle,
    versionLinkPath,
    sourceCodeUrlPath,
    showUselessSteps,
    gitCommit,
    gitTree
  } = config
  const gitRef = gitCommit || 'master'
  const versionLink = gitTree && url.resolve(versionLinkPath, `./${gitTree}`)
  const sourceCodeLink = url.resolve(
    sourceCodeUrlPath + './blob/' + gitRef + '/',
    '.'
  )

  return (
    <Document>
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
        <h2>Overview</h2>
      </header>
      <aside id='TableOfContents'>
        {TableOfContents(chapters)}
      </aside>
      <hr />
      {Chapters({ chapters, sourceCodeLink, showUselessSteps })}
    </Document>
  )
}

export default RspecStory
