/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'

import NavLink from './NavLink'

it('renders', () => {
  const component = renderer.create(
    <div>
      <NavLink isHeading text='Title as Heading'>
        Title as Heading
      </NavLink>
      <NavLink isHeading>
        Title as Children only
      </NavLink>
      <hr />
      <NavLink text='Set Title from Props but give Children'>
        Some other Children Content
      </NavLink>
      <NavLink>
        Title as Children only
      </NavLink>
    </div>
  )
  expect(component.toJSON()).toMatchSnapshot()
})
