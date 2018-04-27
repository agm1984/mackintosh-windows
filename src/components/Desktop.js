import React, { Component } from 'react'
import Window from './Window/Window'
import DesktopIcon from './DesktopIcon/DesktopIcon'
import Taskbar from './Taskbar/Taskbar'
import LoadingSpinner from './LoadingSpinner/LoadingSpinner'
import AdamProperties from './AdamProperties/AdamProperties'
import AdamResume from './AdamResume/AdamResume'
import AdamHobbies from './AdamHobbies/AdamHobbies'
import './Desktop.css'

/**
 * Upon mounting, the Windows Component loads the declared programs into state.
 * These programs and/or their content can be passed in at run-time.
 *
 * In mobile mode, the clock becomes hidden to clean up visual clutter
 * and horizontal space in the task bar. Program dimensions are maximized
 * in mobile mode as well.
 */

class Windows extends Component {
  constructor(props) {
    super(props)
    const windowWidth = document.getElementById('root').offsetWidth
    let mobileMode = false
    if (windowWidth < 1024) {
      mobileMode = true
    }
    this.state = {
      programs: [
        {
          id: 'adamProperties',
          icon: require('./icons/program-adamProperties.png'),
          title: 'Adam Properties',
          content: (
            <AdamProperties onCloseWindow={id => this.handleCloseProgram(id)} />
          ),
          state: !mobileMode ? 'initial' : 'maximized',
          previousState: null,
          width: 450,
          height: 500,
        },
        {
          id: 'adamResume',
          icon: require('./icons/program-adamResume.png'),
          title: 'Adam Resume',
          content: (
            <AdamResume onCloseWindow={id => this.handleCloseProgram(id)} />
          ),
          state: !mobileMode ? 'initial' : 'maximized',
          previousState: null,
          width: 900,
          height: 700,
        },
        {
          id: 'adamHobbies',
          icon: require('./icons/program-adamHobbies.png'),
          title: 'Adam Hobbies',
          content: (
            <AdamHobbies onCloseWindow={id => this.handleCloseProgram(id)} />
          ),
          state: !mobileMode ? 'initial' : 'maximized',
          previousState: null,
          width: 800,
          height: 600,
        },
      ],
      openPrograms: [],
      taskbarOrder: ['adamProperties'],
      activeProgram: 'adamProperties',
      selectedDesktopIcon: '',
      isLoading: true,
    }
  }

  /**
   * The list of open programs must be specified prior to the Desktop mounting
   * or sequential Taskbar logic related to program IDs will be affected.
   */
  componentWillMount() {
    return this.setState({
      openPrograms: [this.state.programs.find(program => program.id === 'adamProperties')],
    })
  }

  /**
   * When the Desktop initially renders, the JavaScript bundle may still be downloading,
   * so the App displays a "Optimizing your experience" modal that disappears when
   * the DOM has completely loaded.
   */
  componentDidMount() {
    const interval = setInterval(() => {
      if (document.readyState === 'complete') {
        clearInterval(interval)
        setTimeout(() => this.setState({ isLoading: false }), 2000)
      }
    }, 100)
    const windowWidth = document.getElementById('root').offsetWidth
    if (windowWidth < 1024) {
      return this.handleActivateProgram('adamProperties', true)
    }
    return null
  }

  /**
   * When a Desktop Icon is pressed, it should change to its selected state.
   * @param {string} id ID of the icon being selected
   */
  handleSelectDesktopIcon(id) {
    return this.setState({ selectedDesktopIcon: id })
  }

  /**
   * When a "currently selected" Desktop Icon is pressed, it should
   * revert back to its unselected state.
   */
  handleUnselectDesktopIcon() {
    return this.setState({ selectedDesktopIcon: '' })
  }

  /**
   * When a program is opened, the currently selected Desktop Icon should be de-selected,
   * and the program should be opened to the forefront of any other open programs.
   * The Taskbar also maintains a list of program IDs that are based on the order
   * in which the programs were opened. This is required to prevent UX issues when
   * programs are activated to the foreground because doing so changes the order
   * that programs appear inside the `openPrograms` array.
   * @param {string} id ID of the program being opened
   */
  handleOpenProgram(id) {
    this.setState({ selectedDesktopIcon: '' })
    const { programs, openPrograms } = this.state
    const isAlreadyOpen = openPrograms.find(program => program.id === id)
    if (!isAlreadyOpen) {
      const programToOpen = programs.find(program => program.id === id)
      return this.setState(prevState => ({
        openPrograms: [...openPrograms, programToOpen],
        taskbarOrder: [...prevState.taskbarOrder, id],
        activeProgram: id,
      }))
    }
    return null
  }

  /**
   * When a program in the Taskbar is pressed, it should be activated and brought to the forefront.
   * If the program is currently minimized, it should be restored to its previous state.
   * @param {string} id ID of the program being activated
   * @param {boolean} isMaximized Boolean that if true, stops the active program
   * from being switched, used to stop backgrounded Windows from activating
   * while they are maximized.
   */
  handleActivateProgram(id, isMaximized) {
    const { openPrograms, activeProgram } = this.state
    const otherPrograms = openPrograms.filter(program => program.id !== id)
    const currentlyActiveProgram = openPrograms.find(program => program.id === activeProgram)
    const newActiveProgram = openPrograms.find(program => program.id === id)
    const { previousState, state } = newActiveProgram
    let memento
    if ((isMaximized && activeProgram !== id) && (currentlyActiveProgram && currentlyActiveProgram.state === 'initial')) {
      memento = {
        ...newActiveProgram,
      }
      return this.setState({
        openPrograms: [...otherPrograms, memento],
        activeProgram: id,
      })
    } else if (isMaximized && activeProgram !== id) {
      return null
    }
    if (state === 'maximized' && activeProgram === id) {
      memento = newActiveProgram
      return this.setState({
        openPrograms: [...otherPrograms, memento],
        activeProgram: id,
      })
    } else if (previousState === 'maximized' && state === 'initial') {
      memento = newActiveProgram
      return this.setState({
        openPrograms: [...otherPrograms, memento],
        activeProgram: id,
      })
    }
    if (state === 'minimized') {
      memento = {
        ...newActiveProgram,
        state: previousState,
        previousState: 'minimized',
      }
      return this.setState({
        openPrograms: [...otherPrograms, memento],
        activeProgram: id,
      })
    }
    memento = {
      ...newActiveProgram,
    }
    return this.setState({
      openPrograms: [...otherPrograms, memento],
      activeProgram: id,
    })
  }

  /**
   * When a Minimize Button is pressed, the program should minimize to the Taskbar.
   * @param {string} id ID of the program being minimized
   */
  handleMinimizeProgram(id) {
    const newDesktopState = this.state.openPrograms.reduce((acc, program) => {
      if (program.id === id && program.state === 'maximized') {
        acc.push({
          ...program,
          state: 'minimized',
          previousState: 'maximized',
        })
      } else if (program.id === id && program.state === 'initial') {
        acc.push({
          ...program,
          state: 'minimized',
          previousState: 'initial',
        })
      } else if (program.id === id) {
        acc.push({
          ...program,
          state: 'minimized',
          previousState: 'initial',
        })
      } else {
        acc.push(program)
      }
      return acc
    }, [])
    return this.setState({
      openPrograms: newDesktopState,
      activeProgram: '',
    })
  }

  /**
   * When a Maximize Button is pressed, the program should resize to full-screen, unless
   * it is already maximized. In this case, it should be restored to its initial size.
   * @param {string} id ID of the program being maximized
   */
  handleMaximizeProgram(id) {
    const newDesktopState = this.state.openPrograms.reduce((acc, program) => {
      if (program.id === id && program.state === 'maximized') {
        acc.push({
          ...program,
          state: 'initial',
          previousState: 'maximized',
        })
      } else if (program.id === id) {
        acc.push({
          ...program,
          state: 'maximized',
          previousState: 'initial',
        })
      } else {
        acc.push(program)
      }
      return acc
    }, [])
    return this.setState({ openPrograms: newDesktopState })
  }

  /**
   * When a Close Button is pressed, the program should be closed.
   * The `taskbarOrder` array must be updated to reflect the new desktop state.
   * @param {string} id ID of the program being closed
   */
  handleCloseProgram(id) {
    const { openPrograms, taskbarOrder } = this.state
    return this.setState({
      openPrograms: openPrograms.filter(program => program.id !== id),
      taskbarOrder: taskbarOrder.filter(programID => programID !== id),
    })
  }

  /**
   * This method takes the list of programs and generates a Desktop Icon for each one.
   * A wrapper div is required to facilitate "tap to open" gesture on mobile.
   */
  renderDesktopIcons() {
    const { programs, selectedDesktopIcon } = this.state
    return programs.map(program => (
      <div
        key={program.id}
        onTouchStart={() => {
          this.handleUnselectDesktopIcon()
          this.handleOpenProgram(program.id)
        }}
      >
        <DesktopIcon
          id={program.id}
          icon={program.icon}
          title={program.title}
          selectedDesktopIcon={selectedDesktopIcon}
          onUnselectDesktopIcon={() => this.handleUnselectDesktopIcon()}
          onSelectProgram={id => this.handleSelectDesktopIcon(id)}
          onOpenProgram={id => this.handleOpenProgram(id)}
        />
      </div>
    ))
  }

  /**
   * This method takes the list of currently-open programs and generates
   * a Window for each one based on its state.
   * The `left` and `top` dimension properties could be modulated at run-time
   * to change the initial UI position of each program when it is opened.
   */
  renderOpenPrograms() {
    const { openPrograms, activeProgram } = this.state
    if (!openPrograms.length) {
      return null
    }
    return openPrograms.map(program => (
      <Window
        state={program.state}
        dimensions={{
          position: 'absolute',
          left: '10%',
          top: '10%',
          width: program.width,
          height: program.height,
          zIndex: 1,
        }}
        key={program.id}
        id={program.id}
        icon={program.icon}
        title={program.title}
        content={() => program.content}
        activeProgram={activeProgram}
        onActiveProgramChange={(id, isMaximized) => this.handleActivateProgram(id, isMaximized)}
        onMinimize={id => this.handleMinimizeProgram(id)}
        onMaximize={id => this.handleMaximizeProgram(id)}
        onClose={id => this.handleCloseProgram(id)}
      />
    ))
  }

  render() {
    const {
      programs, openPrograms, taskbarOrder, activeProgram,
    } = this.state
    return (
      <div id="Windows-wrapper">
        <div className="Windows_activePage">
          {this.renderDesktopIcons()}
          {this.renderOpenPrograms()}
        </div>
        <Taskbar
          programs={programs}
          openPrograms={openPrograms}
          taskbarOrder={taskbarOrder}
          activeProgram={activeProgram}
          onActiveProgramChange={id => this.handleActivateProgram(id)}
          onOpenProgram={id => this.handleOpenProgram(id)}
        />
        <LoadingSpinner
          isLoading={this.state.isLoading}
        />
      </div>
    )
  }
}

export default Windows
