/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'

import ExampleSection from './ExampleSection'
import fixture from '../../spec/fixtures/rspec-features.json'
import config from '../../spec/fixtures/config.json'

it('renders', () => {
  const component = renderer.create(
    <ExampleSection
      title='Section Title'
      example={fixture.examples[0]}
      config={config}
    />
  )
  expect(component.toJSON()).toMatchSnapshot()
})
