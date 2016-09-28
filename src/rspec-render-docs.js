#!/usr/bin/env node

// script to render (HTML) docs from rspec data

import fs from 'fs'
import f from 'active-lodash'
import { renderToStaticMarkup as renderReact } from 'react-dom/server'
import RspecStory from './ui/RspecStory'
process.on('uncaughtException', (e) => { console.error('Error!', e); process.exit(1) })

// user options
const opts = {
  pageTitle: 'Madek Features',
  versionLinkPath: 'https://ci.zhdk.ch/cider-ci/ui/workspace/trees/',
  sourceCodeUrlPath: 'https://github.com/Madek/madek-webapp/',
  showUselessSteps: false // show 1 line of step - title will be the same (currently all)
}

// read JSON data
const rspecData = JSON.parse(fs.readFileSync(process.argv[2]))
if (!f.present(f.get(rspecData, 'examples'))) throw new Error('No Data!')

// build config for view
const config = {
  ...opts,
  gitTree: rspecData.git_tree,
  gitCommit: rspecData.git_commit
}

// build chapter for view
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

// output rendered view
process.stdout.write(
  '<!DOCTYPE html>' +
  renderReact(RspecStory({chapters, config})))
