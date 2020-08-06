import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

const TabList = props => {
  const { children, selectedTab } = props

  const [activeTab, setActiveTab] = useState(selectedTab)

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
  selectedTab: PropTypes.number,
}

export default TabList
