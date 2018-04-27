
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Draggable from 'react-draggable'
import './Window.css'

class Window extends Component {
  constructor(props) {
    super(props)
    this.handleWindowClick = this.handleWindowClick.bind(this)
  }

  /**
   * When a Window is mounted, an event listener should be added to detect if
   * the user is attempting to bring the Window back to the foreground.
   */
  componentDidMount() {
    return document.addEventListener('click', this.handleWindowClick, true)
  }

  /**
   * For memory management reasons, the event listener is removed when
   * the Window unmounts.
   */
  componentWillUnmount() {
    return document.removeEventListener('click', this.handleWindowClick, true)
  }

  /**
   * This function runs every time the user clicks inside or outside the Window.
   * The Window should be brought to the foreground if the click is registered
   * inside the Window's boundaries. If the Window is maximized, the click handler
   * needs to be explicitly disabled to maintain expected functionality. Otherwise,
   * the `onActiveProgramChange` event will cause issues.
   * @param {Synthetic Event} event React-controlled Synthetic Event
   */
  handleWindowClick(event) {
    const {
      state, onActiveProgramChange, id, previousState,
    } = this.props
    if (state === 'maximized') {
      const isMaximized = true
      return onActiveProgramChange(id, isMaximized)
    }
    if (previousState === 'maximized') {
      return null
    }
    const domNode = ReactDOM.findDOMNode(this) // eslint-disable-line
    if (!domNode || !domNode.contains(event.target)) {
      return null
    }
    return onActiveProgramChange(id)
  }

  /**
   * When a Window is maximized, it should be full viewport width and height,
   * minus the height of the Taskbar.
   */
  renderMaximized() {
    const {
      dimensions, id, icon, title, content, activeProgram,
      onMinimize, onMaximize, onClose,
    } = this.props
    const windowWidth = document.getElementById('root').offsetWidth
    const windowHeight = document.getElementById('root').offsetHeight
    const maximizedDimensions = {
      ...dimensions,
      top: 0,
      left: 0,
      width: windowWidth,
      height: `calc(${windowHeight}px - 39px)`, // 39px is Taskbar height
    }
    return (
      <div
        className="window"
        style={maximizedDimensions}
      >
        <div className={activeProgram === id ? 'window_topbar-active' : 'window_topbar-inactive'}>
          <div className="window_topbar-title">
            <div className="window_topbar-icon">
              <img
                src={icon}
                alt={title}
              />
            </div>
            <div>{title}</div>
          </div>
          <div className="window_topbar-buttons">
            <button onClick={() => onMinimize(id)}>
              <img
                id="window_button-icon"
                src={require('./window-minimize.png')}
                alt="Minimize Button"
              />
            </button>
            <button onClick={() => onMaximize(id)}>
              <img
                id="window_button-icon"
                src={require('./window-maximize.png')}
                alt="Maximize Button"
              />
            </button>
            <button onClick={() => onClose(id)}>
              <img
                id="window_button-icon"
                src={require('./window-close.png')}
                alt="Close Button"
              />
            </button>
          </div>
        </div>
        <div className="window_content">
          {content()}
        </div>
      </div>
    )
  }

  /**
   * When a Window is in its initial state, its size is controlled via the dimensions prop
   * which is determined by the Window's configuration in the Desktop State.
   */
  renderInitialSize() {
    const {
      dimensions, id, icon, title, content, activeProgram,
      onMinimize, onMaximize, onClose,
    } = this.props
    return (
      <Draggable>
        <div
          className="window"
          style={dimensions}
        >
          <div className={activeProgram === id ? 'window_topbar-active' : 'window_topbar-inactive'}>
            <div className="window_topbar-title">
              <div className="window_topbar-icon">
                <img
                  src={icon}
                  alt={title}
                />
              </div>
              <div>
                {title}
              </div>
            </div>
            <div className="window_topbar-buttons">
              <button onClick={() => onMinimize(id)}>
                <img
                  id="window_button-icon"
                  src={require('./window-minimize.png')}
                  alt="Minimize Button"
                />
              </button>
              <button onClick={() => onMaximize(id)}>
                <img
                  id="window_button-icon"
                  src={require('./window-maximize.png')}
                  alt="Maximize Button"
                />
              </button>
              <button onClick={() => onClose(id)}>
                <img
                  id="window_button-icon"
                  src={require('./window-close.png')}
                  alt="Close Button"
                />
              </button>
            </div>
          </div>
          <div className="window_content">
            {content()}
          </div>
        </div>
      </Draggable>
    )
  }

  render() {
    switch (this.props.state) {
      case 'minimized': {
        return null
      }
      case 'maximized': {
        return this.renderMaximized()
      }
      default:
      case 'initial': {
        return this.renderInitialSize()
      }
    }
  }
}

Window.defaultProps = {
  previousState: undefined,
  activeProgram: undefined,
}
Window.propTypes = {
  state: PropTypes.string.isRequired,
  onActiveProgramChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  previousState: PropTypes.string,
  dimensions: PropTypes.objectOf(PropTypes.any).isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.func.isRequired,
  activeProgram: PropTypes.string,
  onMinimize: PropTypes.func.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Window
