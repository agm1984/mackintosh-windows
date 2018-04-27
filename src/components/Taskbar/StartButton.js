import React from 'react'
import PropTypes from 'prop-types'
import './Taskbar.css'

/**
 * The Start Button is controlled by the Taskbar Component.
 * @param {*} props React-controlled props are destructured out as used
 */
const StartButton = (props) => {
  const { isActive, onToggle } = props
  return (
    <button
      className={isActive}
      onClick={onToggle}
    >
      <img
        id="start_button-icon"
        src={require('./icons/adamMenu.png')}
        alt="Start Button"
      />
      Menu
    </button>
  )
}

StartButton.propTypes = {
  isActive: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default StartButton
