import React from 'react'
import map from 'lodash/map'

import NavLink from './NavLink'
import { Md } from './Markdown'

const TableOfContents = chapters => (
  <ul>
    {map(chapters, ([ title, sections ]) => [
      <li><NavLink text={title}><Md>{title}</Md></NavLink></li>,
      (<ul>
        {map(sections, ([ title, examples ]) => [
          <li><NavLink text={title}><Md>{title}</Md></NavLink></li>,
          (<ul>
            {map(examples, (example, n) => (
              <li key={title + example.description + n}>
                <NavLink text={`${title}-${example.description}`}>
                  <Md>{example.description}</Md>
                </NavLink>
              </li>
            ))}
          </ul>)
        ])}
      </ul>)
    ])}
  </ul>
)

export default TableOfContents
