import React, { useState, useCallback } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Tab = props => {
  const { component, label } = props

  return <></>
}

Tab.propTypes = {
  component: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
}

export default Tab
