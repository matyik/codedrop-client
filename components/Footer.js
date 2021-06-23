import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Footer = ({ theme }) => {
  const oppositeTheme = theme === 'dark' ? 'light' : 'dark'
  return (
    <div
      className={`bg-${theme}`}
      style={{ paddingTop: '5rem', borderTop: '1px solid #007bff' }}>
      <p className={`text-${oppositeTheme} text-center`}>
        Created by <a href='https://matyi.pro'>Matyi Kari</a>
      </p>
    </div>
  )
}

Footer.propTypes = {
  theme: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme
})

export default connect(mapStateToProps)(Footer)
