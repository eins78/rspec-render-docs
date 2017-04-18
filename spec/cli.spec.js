/* eslint-env jest */
import fs from 'fs'
import childProcess from 'child_process'
import { prepareData } from '../src/rspec-render-docs'
import fixtureData from './fixtures/rspec-features.json'
import fixturePrepared from './fixtures/prepared-data.json'
const shell = childProcess.execSync

it('prepares the data', () => {
  const preparedData = prepareData(fixtureData)
  // NOTE: using manual fixture bc it is used in UI uit tests as well
  // (instead of) expect(preparedData).toMatchSnapshot()
  expect(preparedData).toEqual(fixturePrepared)
})

it('renders the docs', () => {
  shell('rm -rf tmp && mkdir tmp')
  shell(
    `
    cat ./spec/fixtures/rspec-features.json | ./bin/rspec-render-docs > tmp/out.html
  `
  )
  const result = fs.readFileSync('tmp/out.html', 'utf8')
  expect(result).toMatchSnapshot()
})
