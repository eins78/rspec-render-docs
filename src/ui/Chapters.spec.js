/* eslint-env jest */
// import React from 'react'
import renderer from 'react-test-renderer'

import Chapters from './Chapters'
import { buildChapters } from '../rspec-render-docs'
import fixture from '../../spec/fixtures/rspec-features.json'
import config from '../../spec/fixtures/config.json'
const chapters = buildChapters(fixture)

it('renders', () => {
  const component = renderer.create(Chapters({ chapters, ...config }))
  expect(component.toJSON()).toMatchSnapshot()
})
