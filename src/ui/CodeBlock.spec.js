/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'

import CodeBlock from './CodeBlock'

const rubySrc = `
  def foo(bar)
    bar ? bar.to_foo : nil
  end
`

const jsonSrc = JSON.stringify({ foo: 'bar', baz: 1 }, 0, 2)

it('renders', () => {
  const component = renderer.create(
    <div>
      <CodeBlock l='ruby'>{rubySrc}</CodeBlock>
      <CodeBlock l='json'>{jsonSrc}</CodeBlock>
    </div>
  )
  expect(component.toJSON()).toMatchSnapshot()
})
