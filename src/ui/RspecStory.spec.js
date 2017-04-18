/* eslint-env jest */
// import React from 'react'
import renderer from 'react-test-renderer'

import RspecStory from './RspecStory'
import fixture from '../../spec/fixtures/rspec-features.json'
import config from '../../spec/fixtures/config.json'
import { buildChapters } from '../rspec-render-docs'
const chapters = buildChapters(fixture)

it('renders', () => {
  const component = renderer.create(RspecStory({ chapters, config }))
  expect(component.toJSON()).toMatchSnapshot()
})
