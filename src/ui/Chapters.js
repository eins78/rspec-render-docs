import React from 'react'
import map from 'lodash/map'

import NavLink from './NavLink'
import { Md } from './Markdown'
import ExampleSection from './ExampleSection'

const Chapters = ({ chapters, sourceCodeLink, showUselessSteps }) => (
  <article>
    {map(chapters, ([ title, sections ]) => (
      <section key={title}>
        <h2 style={{ display: 'none' }}>
          <NavLink text={title}><Md>{title}</Md></NavLink>
        </h2>
        {map(sections, ([ title, examples ], index) => [
          <h3>
            <NavLink isHeading text={title}><Md>{title}</Md></NavLink>
          </h3>,
          map(examples, example => [
            <h4>
              <NavLink isHeading text={`${title}-${example.description}`}>
                <Md>{example.description}</Md>
              </NavLink>
            </h4>,
            ExampleSection({
              title,
              example,
              config: { sourceCodeLink, showUselessSteps }
            }),
            index < sections.length && <hr />
          ])
        ])}
      </section>
      ))}
  </article>
)

export default Chapters
