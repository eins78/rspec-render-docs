/* eslint-env jest */
// import React from 'react'
import renderer from 'react-test-renderer'

import TableOfContents from './TableOfContents'
import fixture from '../../spec/fixtures/rspec-features.json'
import { buildChapters } from '../rspec-render-docs'

it('renders', () => {
  const chapters = buildChapters(fixture)
  const component = renderer.create(TableOfContents(chapters))
  expect(component.toJSON()).toMatchSnapshot()
})
