import React from 'react'

const Highlighter = ({ mark, children }) =>
  mark ? <mark>{children}</mark> : <span>{children}</span>

export default Highlighter
