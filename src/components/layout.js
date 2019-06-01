import React from "react"
import PropTypes from "prop-types"

import "./layout.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

const Layout = ({ children }) => (
  <main>{children}</main>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
