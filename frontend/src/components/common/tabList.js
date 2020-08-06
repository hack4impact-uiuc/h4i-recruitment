import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

const TabList = props => {
  const { children } = props

  const [activeTab, setActiveTab] = useState(null)

  const onTabClick = useCallback(e => {
    setActiveTab(e.target)
  })

  return (
    <>
      <span>
        {children.map(tab => (
          <p>tab.props.label</p>
        ))}
      </span>
    </>
  )
}

TabList.propTypes = {
  children: PropTypes.element.isRequired,
}

export default TabList
