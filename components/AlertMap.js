import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const AlertMap = ({ alerts, theme }) => (
  <div className={`bg-${theme}`}>
    {alerts !== null &&
      alerts.length > 0 &&
      alerts.map((alert) => (
        <Alert className='mb-0 pb-3' key={alert.id} variant={alert.alertType}>
          {alert.msg}
        </Alert>
      ))}
  </div>
)

AlertMap.propTypes = {
  alerts: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  alerts: state.alert,
  theme: state.theme.theme
})

export default connect(mapStateToProps)(AlertMap)
