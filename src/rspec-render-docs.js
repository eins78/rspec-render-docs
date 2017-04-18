#!/usr/bin/env node

// script to render (HTML) docs from rspec data

import fs from 'fs'
import f from 'lodash'
import { buffer as getStdin } from 'get-stdin'
import { renderToStaticMarkup as renderReact } from 'react-dom/server'
import RspecStory from './ui/RspecStory'

const exitOnErr = e => {
  console.error('Error!', e)
  process.exit(1)
}
process.on('uncaughtException', exitOnErr)

// user options
const opts = {
  pageTitle: 'Madek Features',
  versionLinkPath: 'https://ci.zhdk.ch/cider-ci/ui/workspace/trees/',
  sourceCodeUrlPath: 'https://github.com/Madek/madek-webapp/',
  // show 1 line of step - title will be the same (currently all)
  showUselessSteps: false
}

// build chapters for view
// NOTE: only supports 2 levels of nesting, so need to get full_description
//       from example_group (but still only 1. line - title!)
export const buildChapters = ({ examples }) => f
  .chain(examples)
  .sortBy(e => f.get(e, 'example_group.scoped_id'))
  .groupBy(e => f.first(f.get(e, 'example_group.full_description').split('\n')))
  .toPairs()
  .sortBy(([ key ]) => (key || '').toLowerCase())
  .groupBy(([ key ]) => f.first(key.split(':')).trim())
  .toPairs()
  .value()

const renderFromJSONString = str => {
  const rspecData = JSON.parse(str)
  if (f.isEmpty(f.get(rspecData, 'examples'))) throw new Error('No Data!')

  // build data for view
  const chapters = buildChapters(rspecData)
  const config = {
    ...opts,
    gitTree: rspecData.git_tree,
    gitCommit: rspecData.git_commit,
    summary: rspecData.summary
  }

  // output rendered view
  process.stdout.write(
    '<!DOCTYPE html>' + renderReact(RspecStory({ chapters, config }))
  )
}

// read JSON data from filename argument or stdin & render
if (process.argv[2]) {
  fs.readFile(process.argv[2], (err, res) => {
    if (err) {
      throw new Error(err)
    }
    renderFromJSONString(res)
  })
} else {
  getStdin().then(str => renderFromJSONString(str)).catch(exitOnErr)
}
