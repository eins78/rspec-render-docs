/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'

import Highlighter from './Highlighter'

it('renders', () => {
  const component = renderer.create(
    <div>
      <Highlighter mark>marked text</Highlighter>
      <hr />
      <Highlighter mark={false}>not marked text</Highlighter>
      <hr />
      <Highlighter>not marked text</Highlighter>
    </div>
  )
  expect(component.toJSON()).toMatchSnapshot()
})
