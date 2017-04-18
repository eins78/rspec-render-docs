/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'

import Document from './Document'

it('renders', () => {
  const component = renderer.create(
    <Document pageTitle='the title'>
      <p>children content</p>
    </Document>
  )
  expect(component.toJSON()).toMatchSnapshot()
})
