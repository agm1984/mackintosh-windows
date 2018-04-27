import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Draggable from 'react-draggable'
import './DesktopIcon.css'

class DesktopIcon extends Component {
  constructor(props) {
    super(props)
    this.handleNextClick = this.handleNextClick.bind(this)
  }

  /**
   * When the Desktop Icon is mounted (ie: displayed), an event listener should
   * be added to detect if the user presses outside the Desktop Icon's boundaries
   * while it is selected.
   */
  componentDidMount() {
    return document.addEventListener('click', this.handleNextClick, true)
  }

  /**
   * For memory management reasons, the event listener is removed when
   * the Desktop Icon unmounts.
   */
  componentWillUnmount() {
    return document.removeEventListener('click', this.handleNextClick, true)
  }

  /**
   * If the user clicks a Desktop Icon to select it and then clicks anywhere
   * outside the icon's hitspace, the icon should be de-selected.
   * @param {Synthetic Event} event React-controlled Synthetic Event
   */
  handleNextClick(event) {
    const { selectedDesktopIcon, id, onUnselectDesktopIcon } = this.props
    if (selectedDesktopIcon === id) {
      const domNode = ReactDOM.findDOMNode(this) // eslint-disable-line
      if (!domNode || !domNode.contains(event.target)) {
        return onUnselectDesktopIcon()
      }
    }
    return null
  }

  render() {
    const {
      id, icon, title, selectedDesktopIcon, onSelectProgram, onOpenProgram,
    } = this.props
    /**
     * Disabling a11y event listeners because of time-space complexity increase.
     * Normally, these kind of optimizations are very important to me for
     * a maximum accessible, inclusive web.
     */
    /* eslint-disable */
    return (
      <Draggable>
        <div
          className="icon-container"
          onClick={() => onSelectProgram(id)}
          onDoubleClick={() => onOpenProgram(id)}
        >
          <img
            draggable={false}
            className="icon-icon"
            alt={title}
            src={icon}
          />
          <div className="icon-text">
            {title}
          </div>
          {(selectedDesktopIcon === id) && (
            <div className="icon-selected" />
          )}
        </div>
      </Draggable>
    )
    /* eslint-enable */
  }
}

DesktopIcon.defaultProps = {
  selectedDesktopIcon: '',
}
DesktopIcon.propTypes = {
  selectedDesktopIcon: PropTypes.string,
  onUnselectDesktopIcon: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onSelectProgram: PropTypes.func.isRequired,
  onOpenProgram: PropTypes.func.isRequired,
}

export default DesktopIcon
