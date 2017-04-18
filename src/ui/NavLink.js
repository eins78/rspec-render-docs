import React from 'react'
import kebabCase from 'lodash/kebabCase'
import deburr from 'lodash/deburr'
const slugify = str => kebabCase(deburr(str))

// document-internal link from text, self-links when isHeading
const NavLink = ({ text, isHeading, children }) => {
  const slug = slugify(text || children)
  return <a href={'#' + slug} id={isHeading ? slug : null}>{children}</a>
}

export default NavLink
