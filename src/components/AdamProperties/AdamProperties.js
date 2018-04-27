import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BackendSkills from './BackendSkills'
import FrontendSkills from './FrontendSkills'
import './AdamProperties.css'

class AdamProperties extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'general',
      currentlySelectedSkiList: 'backend',
      isRefreshingSkills: false,
      currentlySelectedSocLink: '',
    }
  }

  /**
   * Additional Window Tabs can be added here as long as there is an accompanying
   * case in the `renderActiveTabContent` method switch.
   */
  renderTabs() {
    const tabs = [
      { id: 'general', label: 'General' },
      { id: 'skills', label: 'Skills' },
      { id: 'social', label: 'Social Profiles' },
    ]
    return tabs.map(tab => (
      <button
        className={this.state.activeTab === tab.id ? 'tabSelected' : 'tabUnselected'}
        onClick={() => this.setState({ activeTab: tab.id })}
        key={tab.id}
      >
        {tab.label}
      </button>
    ))
  }

  /**
   * Window Content is loaded based on this method's switch cases. When a Tab is
   * marked as active, its counterpart content is rendered.
   */
  renderActiveTabContent() {
    switch (this.state.activeTab) {
      default:
      case 'general': {
        return (
          <div id="gen_wrapper">
            <div id="gen_left">
              <img
                id="ap_photo"
                src={require('./adamProfilePicture.png')}
                alt="Adam's Profile"
              />
            </div>
            <div id="gen_right">
              <div className="gen_right-heading">Name:</div>
              <div className="gen_right-text">Adam Mackintosh</div>
              <div className="gen_right-heading">Location:</div>
              <div className="gen_right-text">Vancouver Island, BC</div>
              <div className="gen_right-text">Canada</div>
              <div className="gen_right-heading">Work Experience:</div>
              <div className="gen_right-text">15+ years</div>
            </div>
          </div>
        )
      }
      case 'skills': {
        const { currentlySelectedSkiList, isRefreshingSkills } = this.state
        const render = {
          refreshView: (
            <div id="ski_list-refresh">
              Loading...
            </div>
          ),
          backend: (
            <div>
              <div id="ski_list-topRow">
                <img
                  className="ski_list-icon"
                  src={require('./icons/adamIcon.png')}
                  alt="Adam Icon"
                />
                Adam's Back-end Skills
              </div>
              <BackendSkills />
            </div>
          ),
          frontend: (
            <div>
              <div id="ski_list-topRow">
                <img
                  className="ski_list-icon"
                  src={require('./icons/adamIcon.png')}
                  alt="Adam Icon"
                />
                Adam's Front-end Skills
              </div>
              <FrontendSkills />
            </div>
          ),
        }
        return (
          <div id="ski_wrapper">
            <div id="ski_radioboxes">
              <button
                id="ski_radioboxes-left"
                onClick={() => this.setState({ currentlySelectedSkiList: 'backend' })}
              >
                <input
                  type="radio"
                  checked={currentlySelectedSkiList === 'backend' && true}
                  readOnly
                />
                Back-end
              </button>
              <button
                id="ski_radioboxes-right"
                onClick={() => this.setState({ currentlySelectedSkiList: 'frontend' })}
              >
                <input
                  type="radio"
                  checked={currentlySelectedSkiList === 'frontend' && true}
                  readOnly
                />
                Front-end
              </button>
            </div>
            <div className="ski_list">
              {isRefreshingSkills ? render.refreshView : render[currentlySelectedSkiList] }
            </div>
            <div id="ski_buttons">
              <button
                className="ski_buttons-normal"
                onClick={() => {
                  this.setState({ isRefreshingSkills: true })
                  setTimeout(() => this.setState({ isRefreshingSkills: false }), 1000)
                }}
              >
                Refresh
              </button>
            </div>
          </div>
        )
      }
      case 'social': {
        const { currentlySelectedSocLink } = this.state
        const links = {
          twitter: {
            id: 'twitter',
            icon: require('./icons/soc_icon-twitter.png'),
            label: 'Twitter',
            url: 'http://www.twitter.com/agm1984',
            altText: 'Twitter Logo',
          },
          stackOverflow: {
            id: 'stackOverflow',
            icon: require('./icons/soc_icon-stackOverflow.png'),
            label: 'Stack Overflow',
            url: 'https://stackoverflow.com/users/6141025/agm1984',
            altText: 'Stack Overflow Logo',
          },
          gitHub: {
            id: 'gitHub',
            icon: require('./icons/soc_icon-gitHub.png'),
            label: 'GitHub',
            url: 'https://github.com/agm1984',
            altText: 'GitHub Logo',
          },
        }
        return (
          <div id="soc_wrapper">
            <div id="soc_picker-container">
              <div id="soc_picker-heading">
                Pick one
              </div>
              <div id="soc_picker-background">
                {Object.keys(links).map((name) => {
                  if (currentlySelectedSocLink === links[name].id) {
                    return (
                      <button
                        className="soc_link"
                        onClick={() => this.setState({ currentlySelectedSocLink: '' })}
                        key={name}
                      >
                        <img
                          className="soc_link-icon"
                          src={links[name].icon}
                          alt={links[name].altText}
                        />
                        <div className="soc_link-textSelected">
                          {links[name].label}
                        </div>
                        <div className="soc_link-selected" />
                      </button>
                    )
                  }
                  return (
                    <button
                      className="soc_link"
                      onClick={() => this.setState({ currentlySelectedSocLink: links[name].id })}
                      key={name}
                    >
                      <img
                        className="soc_link-icon"
                        src={links[name].icon}
                        alt={links[name].altText}
                      />
                      <div className="soc_link-text">
                        {links[name].label}
                      </div>
                    </button>
                  )
                })}
              </div>
              <div id="soc_buttons">
                {currentlySelectedSocLink
                  ? (
                    <a
                      className="soc_buttons-button"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={links[currentlySelectedSocLink].url}
                    >
                      Visit Link
                    </a>
                  )
                  : (
                    <button
                      className="soc_buttons-buttonDisabled"
                      disabled
                    >
                      Visit Link
                    </button>
                  )}
              </div>
            </div>
          </div>
        )
      }
    }
  }
  render() {
    return (
      <div id="ap_wrapper">
        <div id="ap_tabs">
          {this.renderTabs()}
        </div>
        <div id="ap_tabs_content">
          {this.renderActiveTabContent()}
        </div>
        <div id="ap_buttons">
          <button
            className="ap_buttons-normal"
            onClick={() => this.props.onCloseWindow('adamProperties')}
          >
            OK
          </button>
          <button
            className="ap_buttons-normal"
            onClick={() => this.props.onCloseWindow('adamProperties')}
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }
}

AdamProperties.propTypes = {
  onCloseWindow: PropTypes.func.isRequired,
}

export default AdamProperties
