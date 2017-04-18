/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'

import { Md } from './Markdown'

const inlineMarkdownExamples = [
  'plain text',
  '*expected* **inline** `markdown` ***content*** *`yay`*',
  `
content with blocks like

### Block-Level Heading

> and other ***non-inline*** markdown

is not allowed
==============

but will be output as plain text
  `,
  `any <em>html tags</em> are stripped as well`
]

inlineMarkdownExamples.forEach((str, i) => {
  it(`renders example ${i + 1}`, () => {
    const component = renderer.create(<Md>{str}</Md>)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
